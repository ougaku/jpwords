# JpWords Admin

日语背词 App 的第一版系统维护后台，用于维护单词库、学习资料、会员权益、运营配置和角色权限。

## Run

```powershell
node server.js
```

指定端口运行：

```powershell
node server.js 4184
```

Open:

```text
http://127.0.0.1:4173
```

## Git Workflow

后续修改完成后使用脚本提交并推送：

```powershell
.\scripts\commit-and-push.ps1 -Title "Implement admin maintenance dashboard" -Details "Updated word library maintenance, CSV import validation, membership operations, and role permissions."
```

脚本会：

- 检查当前改动
- 生成包含文件变更列表的详细提交信息
- 执行 `git add -A`
- 创建 commit
- 推送到当前分支
