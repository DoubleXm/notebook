# 栈记

全栈开发知识库,收录前端(Vue、React、前端工程化)、服务端与数据(Nest、Python、MySQL)、运维与 AI(Docker、Linux、LangChain、LangGraph)以及常用工具笔记。

站点基于 [Fumadocs](https://fumadocs.dev) 二次开发,在它的文档框架、MDX 加载与搜索之上替换了整套视觉与首页逻辑,并配置为**纯静态导出**,构建产物可直接交给任意静态托管。

## 技术栈

- **Fumadocs**:`fumadocs-core`(内容加载与搜索)、`fumadocs-mdx`(MDX 编译)、`fumadocs-ui`(文档外壳)。注意 `package.json` 里 `fumadocs-ui` 指向的是 `@fumadocs/base-ui` 这个发布包。
- **Next.js 16**(App Router,`output: 'export'` 静态导出)+ React 19
- **Tailwind CSS 4**(PostCSS 插件形式引入)
- 内容为 MDX,代码高亮由 Fumadocs 内置的 Shiki 处理;`motion` 负责动效,`lucide-react` 提供图标。

运行环境要求 Node.js ≥ 22、npm ≥ 10(见 `package.json` 的 `engines`)。

## 本地开发

```bash
npm install
npm run dev     # http://localhost:3000,文档入口在 /docs
```

其它命令:

```bash
npm run types:check   # Next 类型生成 + tsc 检查
npm run build         # 静态产物输出到 out/
npm start             # 本地起静态服务器预览 out/
```

## 构建与部署

`next.config.mjs` 里开了 `output: 'export'`,同时关闭了图片优化(静态导出没有图片优化服务),所以产物是纯静态文件,不需要 Node 服务,把 `out/` 交给 Vercel、Netlify、Cloudflare Pages、GitHub Pages 等任意静态托管即可。

部署时两点注意:

- `NEXT_PUBLIC_SITE_URL` 在构建时读取,用于生成 canonical 与 OG 图的绝对地址,正式环境记得设置。
- 搜索索引是构建产物里的 `out/api/search` 这个文件(不是目录),约 5MB,请开启 gzip/brotli 压缩(压完约 1MB)。

## 项目结构

```
content/docs/          站点内容
  index.mdx            首页文档
  meta.json            顶层导航分组（前端 / 服务端与数据 / 运维与 AI / 工具）
  <分类>/              各分类目录，逐级带自己的 meta.json

app/                   Next.js App Router
  layout.tsx           全站根布局、元数据，挂载 Fumadocs 的 RootProvider
  global.css           全局样式（Tailwind 入口 + 主题令牌）
  (home)/page.tsx      首页，从内容树生成分类与二级入口
  docs/[[...slug]]/    文档页面
  api/search/route.ts  构建时导出搜索索引 JSON，浏览器下载后本地搜索
  og/docs/[...slug]/   每页动态生成 OG 图
  llms.txt/, llms.mdx/ 面向 LLM 的纯文本索引与逐页 Markdown

components/            站点组件
  mdx.tsx              MDX 组件映射（覆盖 Card、img 等默认组件）
  home-page.tsx        首页
  sheet.tsx            通用构件（细线、进场位移、分区标题）
  line-card.tsx        正文里的卡片
  chrome/              首屏、页面切换、搜索弹窗

lib/                   配置与工具
  source.ts            Fumadocs 内容加载器、页面树、llms 输出
  shared.ts            站点名与内容路由常量
  layout.shared.tsx    文档站顶部导航
  cn.ts / ui.ts / motion.ts   类名合并、共享 class 串、动效参数

public/                静态图片资源（按分类分目录）
source.config.ts       fumadocs-mdx 配置（代码高亮主题、图片处理）
next.config.mjs        静态导出配置
```

新增笔记只需在 `content/docs/<分类>/` 下添加 `.mdx` 文件,并在同级 `meta.json` 的 `pages` 里登记即可,导航与首页会自动读取内容树更新。
