# RICH 2027 八期行程网站

双击 `index.html` 打开八期总览。点击北京或上海的期次卡片进入完整行程；详情页顶部与页脚可返回总览。页面可直接在浏览器打开，无需安装依赖或构建。

## 文件与版本

- `index.html`：八期总览。
- `beijing-s1.html` 至 `beijing-s4.html`：北京四期。
- `shanghai-s1.html` 至 `shanghai-s4.html`：上海四期。
- `版本对照.md`：原始文件映射、SHA-256 及内容保留核对。

后续替换行程时保留稳定文件名，并同步总览中的日期、路线和版本对照。正文与原版行程保持一致，网站副本仅增加返回总览的导航和相应样式，并去掉禁止搜索引擎收录的 robots 标签。在线字体由 Google Fonts 加载；无网络时使用系统回退字体。

## 后续发布建议

GitHub 仓库：[RICH-Camps/rich-2027](https://github.com/RICH-Camps/rich-2027)。

本仓库保存2027总览及八期最新行程。Vercel 尚未导入或部署；下一步沿用2026年的 GitHub → Vercel 发布流程。

1. 网站文件位于 `rich-2027` 仓库根目录，首页是 `index.html`。以后更新时替换对应的稳定文件名并提交。
2. 在 Vercel 新建项目并导入该 GitHub 仓库，Root Directory 选仓库根目录。
3. Framework Preset 选择 `Other`；启用 Build Command 的 Override 并留空；Output Directory 设为 `.`。本项目无需构建命令或依赖安装。
4. 完成部署后，使用 Vercel 实际分配的地址验证首页、八期详情、返回导航和移动端显示。
5. 确定最终域名后再配置域名、canonical 链接与站点地图；域名及项目地址的可用性以实际配置结果为准。

设置依据：[Vercel 构建配置文档](https://vercel.com/docs/builds/configure-a-build)及[Vercel 入门文档](https://vercel.com/docs/getting-started-with-vercel)。
