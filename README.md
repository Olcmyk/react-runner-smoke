# React Runner 测试

这个静态网站用于验证 GitHub Actions 能否在自托管 Linux Runner 上构建 React 项目。

## 从 GitHub 运行

推送到 `main` 会触发 **React static build**。也可以在仓库的 **Actions** 页面选择该工作流并点击 **Run workflow**。

GitHub 会把任务交给带有 `react-runner-smoke` 标签的 Linux x64 Runner。任务会安装锁定的依赖、编译网页、临时通过本机 HTTP 验证首页及其 JavaScript，再上传 `react-static-site` 产物并更新内网测试站点。

## 在本地查看

使用 Node.js 24 运行以下命令，然后打开终端显示的预览地址。

```sh
npm ci
npm run build
npm run preview
```
