const mysql = require("mysql2/promise");

const requiredEnv = ["MYSQL_HOST", "MYSQL_DATABASE", "MYSQL_USER", "MYSQL_PASSWORD"];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`缺少环境变量：${missing.join(", ")}`);
  process.exit(1);
}

const tableName = `codex_crud_test_${Date.now()}`;
const quotedTableName = `\`${tableName}\``;

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: Number(process.env.MYSQL_PORT || 3306),
    charset: "utf8mb4",
    connectTimeout: 15000,
  });

  const results = [];

  try {
    await connection.execute(`
      CREATE TABLE ${quotedTableName} (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        word VARCHAR(64) NOT NULL,
        kana VARCHAR(64) NOT NULL,
        meaning VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    results.push("创建表成功");

    const [insertResult] = await connection.execute(
      `INSERT INTO ${quotedTableName} (word, kana, meaning) VALUES (?, ?, ?)`,
      ["学校", "がっこう", "学校"]
    );
    results.push(`插入数据成功，id=${insertResult.insertId}`);

    const [selectRows] = await connection.execute(
      `SELECT id, word, kana, meaning FROM ${quotedTableName} WHERE id = ?`,
      [insertResult.insertId]
    );
    assert(selectRows.length === 1, "查询插入数据失败");
    assert(selectRows[0].word === "学校", "查询结果不符合预期");
    results.push("查询数据成功");

    const [updateResult] = await connection.execute(
      `UPDATE ${quotedTableName} SET meaning = ? WHERE id = ?`,
      ["学校，学习场所", insertResult.insertId]
    );
    assert(updateResult.affectedRows === 1, "更新数据失败");
    results.push("更新数据成功");

    const [updatedRows] = await connection.execute(
      `SELECT meaning FROM ${quotedTableName} WHERE id = ?`,
      [insertResult.insertId]
    );
    assert(updatedRows[0].meaning === "学校，学习场所", "更新后查询结果不符合预期");
    results.push("更新后查询成功");

    const [deleteResult] = await connection.execute(
      `DELETE FROM ${quotedTableName} WHERE id = ?`,
      [insertResult.insertId]
    );
    assert(deleteResult.affectedRows === 1, "删除数据失败");
    results.push("删除数据成功");

    const [remainingRows] = await connection.execute(`SELECT COUNT(*) AS count FROM ${quotedTableName}`);
    assert(remainingRows[0].count === 0, "删除后仍存在测试数据");
    results.push("删除后查询成功");
  } finally {
    await connection.execute(`DROP TABLE IF EXISTS ${quotedTableName}`);
    results.push("删除表成功");
    await connection.end();
  }

  console.log("MySQL CRUD 测试通过：");
  results.forEach((item) => console.log(`- ${item}`));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

main().catch((error) => {
  console.error("MySQL CRUD 测试失败：");
  console.error(error.message);
  process.exit(1);
});
