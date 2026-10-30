## Independent fallback restored: 2026-10-30

https://2027.richcamps.com/ serves the ten itinerary pages directly on Vercel. It no longer redirects to SiteGround. `node build-standalone.mjs` builds `standalone-dist` from the source HTML and assets, rewriting only runtime asset paths and local itinerary navigation for the domain root. The four current Chinese font subsets and their stylesheet are bundled as `assets/standalone-20261030-*`; font licenses remain in `assets/optimized-20261013/`.

Source HTML, canonical URLs, sitemap and structured data still identify the primary SiteGround itinerary pages. This is an availability fallback, not a new SEO migration. Vercel builds do not deploy SiteGround. Update the shared source and verify both deployments when changing itineraries. The independent version includes existing direct email/WhatsApp/WeChat contact controls; main-site fees/application links still require SiteGround and the family database is not mirrored.

Vercel domain binding and Alibaba DNS were already correct and were not changed. Roll back by restoring the previous vercel.json from commit 9b20ec370e558ecebc29a4e8799bfa698fa4c8cc. Do not delete the Vercel project/domain or historical assets.

The notes below describe earlier releases and are superseded by this section for Vercel hosting behavior.

## Production migration: 2026-10-24
Canonical itineraries now live at https://www.richcamps.com/itineraries/2027/ on SiteGround. This GitHub repository remains the version-controlled source. Vercel and 2027.richcamps.com remain active as per-page permanent redirects; do not remove the project, domain or old versioned assets.
Deploy HTML to rich-itinerary-content-20261024 outside public_html; public assets and isolated delivery routes live under public_html/itineraries/2027/. Main-site links and sitemap are deployed separately. No family database/config changes.
Use new filenames for changed cached assets. Preserve bilingual copy, dates and anchors. The migration archive includes deployment/rollback manifests and validation evidence.

## Search and link review: 2026-10-16

All ten public pages have been reviewed against the deployed main website. The eight itinerary footers now provide the corresponding city's English and Chinese dates/fees pages, plus both application guides. The 2026 comparison references intentionally remain on the historical 2026 website. No development hostname was found in the current baseline; keep all public links on production hosts.

Page titles, descriptions, Open Graph and Twitter metadata are consistent. WebPage/CollectionPage metadata includes the itinerary's actual date range and places where applicable, with related links to authoritative fees and application pages. Daily activities, session-specific enquiries and comparison figures are unchanged. Bilingual content shares one URL, so it is not labelled as two separate hreflang versions. No AI-only files, ratings or invented event offers are used.

The active font stylesheet is `assets/search-20261016/fonts.css`. It loads two refreshed Chinese subsets (including the fee-navigation character 费) and reuses the three existing Latin files. Pages still load at most five shared font files. Earlier versioned resources remain available for cached pages.

Run `python3 check_site.py` before publishing to validate links, fragments, metadata, JSON-LD, sitemap coverage and date ranges. Recheck production responses after Vercel deploys. Use new names for modified assets under immutable cache paths.

## Current release: 2026-10-13

All ten pages now link prominently to the English and Chinese main website. Itinerary dates and daily activities are unchanged. Each page has a self-referencing canonical URL and structured WebPage/Organization metadata; robots.txt and sitemap.xml list the ten public URLs. The comparison page includes a static summary of all three routes.

Active resources are in `assets/optimized-20261013/`: five shared font files (about 894 KB combined), page CSS, connections CSS, deferred scripts and SIL OFL licenses. The old 217-font package is obsolete after this release and can be recovered from Git history. The historical notes below describe the September baseline, not the current active assets.

Regenerate the Chinese font subsets after adding characters; do not reuse the main website's smaller homepage subset. Use a new versioned asset directory when changing cached resources. The website remains plain static HTML, without a build or runtime dependency. Serve through HTTP for local previews because overview links use `/`.

`vercel.json` permanently redirects `/index.html` to `/`, redirects the public default Vercel hostname to the custom domain, and gives versioned assets long browser caching. No DNS, plan, security or hosting-provider changes are part of this release.

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
