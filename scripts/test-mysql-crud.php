<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$expectedToken = getenv('JPWORDS_TEST_TOKEN') ?: '';
$actualToken = $_GET['token'] ?? '';
if ($expectedToken !== '' && !hash_equals($expectedToken, $actualToken)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'forbidden'], JSON_UNESCAPED_UNICODE);
    exit;
}

$host = getenv('MYSQL_HOST');
$database = getenv('MYSQL_DATABASE');
$user = getenv('MYSQL_USER');
$password = getenv('MYSQL_PASSWORD');
$port = (int)(getenv('MYSQL_PORT') ?: '3306');

foreach (['MYSQL_HOST' => $host, 'MYSQL_DATABASE' => $database, 'MYSQL_USER' => $user, 'MYSQL_PASSWORD' => $password] as $key => $value) {
    if ($value === false || $value === '') {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => "missing env: {$key}"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

$table = 'codex_crud_test_' . date('YmdHis') . '_' . random_int(1000, 9999);
$quotedTable = '`' . str_replace('`', '``', $table) . '`';
$steps = [];

try {
    $pdo = new PDO(
        "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4",
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    $pdo->exec("
        CREATE TABLE {$quotedTable} (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            word VARCHAR(64) NOT NULL,
            kana VARCHAR(64) NOT NULL,
            meaning VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");
    $steps[] = '创建表成功';

    $stmt = $pdo->prepare("INSERT INTO {$quotedTable} (word, kana, meaning) VALUES (?, ?, ?)");
    $stmt->execute(['学校', 'がっこう', '学校']);
    $id = (int)$pdo->lastInsertId();
    $steps[] = "插入数据成功，id={$id}";

    $stmt = $pdo->prepare("SELECT id, word, kana, meaning FROM {$quotedTable} WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row || $row['word'] !== '学校') {
        throw new RuntimeException('查询插入数据失败');
    }
    $steps[] = '查询数据成功';

    $stmt = $pdo->prepare("UPDATE {$quotedTable} SET meaning = ? WHERE id = ?");
    $stmt->execute(['学校，学习场所', $id]);
    if ($stmt->rowCount() !== 1) {
        throw new RuntimeException('更新数据失败');
    }
    $steps[] = '更新数据成功';

    $stmt = $pdo->prepare("SELECT meaning FROM {$quotedTable} WHERE id = ?");
    $stmt->execute([$id]);
    $updated = $stmt->fetch();
    if (!$updated || $updated['meaning'] !== '学校，学习场所') {
        throw new RuntimeException('更新后查询结果不符合预期');
    }
    $steps[] = '更新后查询成功';

    $stmt = $pdo->prepare("DELETE FROM {$quotedTable} WHERE id = ?");
    $stmt->execute([$id]);
    if ($stmt->rowCount() !== 1) {
        throw new RuntimeException('删除数据失败');
    }
    $steps[] = '删除数据成功';

    $count = (int)$pdo->query("SELECT COUNT(*) FROM {$quotedTable}")->fetchColumn();
    if ($count !== 0) {
        throw new RuntimeException('删除后仍存在测试数据');
    }
    $steps[] = '删除后查询成功';

    echo json_encode(['ok' => true, 'table' => $table, 'steps' => $steps], JSON_UNESCAPED_UNICODE);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'table' => $table, 'steps' => $steps, 'error' => $error->getMessage()], JSON_UNESCAPED_UNICODE);
} finally {
    if (isset($pdo)) {
        try {
            $pdo->exec("DROP TABLE IF EXISTS {$quotedTable}");
            $steps[] = '删除表成功';
        } catch (Throwable $cleanupError) {
            // The JSON response may already have been sent; cleanup errors are intentionally ignored.
        }
    }
}
