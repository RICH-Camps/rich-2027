# RICH 2027 八期行程网站

双击 `index.html` 打开八期总览。点击北京或上海的期次卡片进入完整行程；详情页顶部与页脚可返回总览。页面可直接在浏览器打开，无需安装依赖或构建。

## 文件与版本

- `index.html`：八期总览，含年度对比页入口。
- `compare-2026-2027.html`：2026与2027行程对比，按每天3小时呈现课日与总课时。
- `beijing-s1.html` 至 `beijing-s4.html`：北京四期。
- `shanghai-s1.html` 至 `shanghai-s4.html`：上海四期。
- `版本对照.md`：原始文件映射、SHA-256 及内容保留核对。

后续替换行程时保留稳定文件名，并同步总览中的日期、路线和版本对照。正文与原版行程保持一致，网站副本增加返回总览的导航和相应样式，并去掉禁止搜索引擎收录的 robots 标签。2026-09-30 起，四款 Google 官方字体随网站一起托管：Cormorant Garamond、Montserrat、Noto Sans SC、Noto Serif SC。原有字重、斜体和排版保持不变。

字体目录为 `assets/fonts/google-20260930/`，内含 `fonts.css`、217 个原版 WOFF2 字体文件、四份 SIL Open Font License 及 `SOURCES.json` 来源与哈希记录。HTML 和字体 CSS 均使用相对路径。复制、上传网站时请保留整个 `assets` 目录；不再依赖 Google Fonts 在线请求，缺少字体或尚未加载完成时使用原有系统回退字体。中文字体按官方字符区段按需加载，不会每页下载整个字体包。

## 网站发布与后续更新

GitHub 仓库：[RICH-Camps/rich-2027](https://github.com/RICH-Camps/rich-2027)。

正式网站：[2027.richcamps.com](https://2027.richcamps.com/)。

Vercel 已连接本仓库的 `main` 分支。更新文件并提交后会自动重新部署；正式域名及 HTTPS 已配置完成。

1. 首页与八期行程使用稳定文件名，文件位于仓库根目录。
2. 对比页为 `compare-2026-2027.html`，首页顶部导航与专题介绍均可进入。
3. Vercel 配置：Application Preset `Other`，Root Directory `./`，Build Command 的 Override 开启并留空，Output Directory 为 `.`。无需依赖或环境变量。
4. 更新完成后在正式网站检查首页、对比切换、八期详情及返回导航。

对比页统计口径：北京—西安及北京—成都均由6天18小时增至10天30小时；上海—北京由8天24小时增至12天36小时。成都2026年采用团队确认的实际执行6天。每个集体中文课日按3小时计算；一对一辅导与外出中文任务不计入上述课时。

设置依据：[Vercel 构建配置文档](https://vercel.com/docs/builds/configure-a-build)及[Vercel 入门文档](https://vercel.com/docs/getting-started-with-vercel)。
