# 仓库说明

本仓库 fork 自 [jepiqueau/capacitor-data-storage-sqlite](https://github.com/jepiqueau/capacitor-data-storage-sqlite) v2.1.0，在此基础上做了定制修改，详见 `wg-update.md`。

## 发布流程

1. 修改 `package.json` 中的 `version`
2. 提交代码
3. 执行发布脚本，自动读取版本号、打 tag 并推送

```bash
npm run release
```

tag 推送后，GitHub Actions 自动打包并上传到阿里云 OSS。tag 格式为 `v{version}`。

## 产物下载地址

```
{OSS_CDN_BASE}/plugins/capacitor/{package-name}-{version}.tgz
```

## 在项目中使用

```json
"dependencies": {
  "capacitor-data-storage-sqlite": "https://your-cdn/plugins/capacitor/capacitor-data-storage-sqlite-2.1.0-1.tgz"
}
```

## GitHub Actions 配置

仓库 Settings → Secrets and variables → Actions。

实际值可从以下仓库查阅：
- `wg-deploy-center-k8s/vars/credentials.yml`
- `wg-deploy-center/vars/credentials.yml`

**Variables**（非敏感，明文可见）：

| 变量 | 值 |
|------|----|
| `OSS_ENDPOINT` | `oss-cn-hangzhou.aliyuncs.com` |
| `OSS_BUCKET` | `wg-public` |
| `OSS_REMOTE_DIR` | `mobile-2.0/plugins` |

**Secrets**（敏感，写入后不可见，从上述仓库 `credentials.yml` 查阅）：

| Secret | 说明 |
|--------|------|
| `OSS_ACCESS_KEY_ID` | `oss_access_key` |
| `OSS_ACCESS_KEY_SECRET` | `oss_secret_key` |

上传成功后的访问地址格式：

```
https://wg-public.oss-cn-hangzhou.aliyuncs.com/mobile-2.0/plugins/{package-name}-{version}.tgz
```
