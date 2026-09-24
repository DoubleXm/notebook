# 栈记

基于 Next.js 与 Fumadocs 构建的全栈开发知识库。内容涵盖前端、后端、数据库、Linux、Docker、工程实践与面试复习。

## 本地开发

```bash
npm run dev
```

打开 http://localhost:3000/docs 查看文档。

## 内容维护

- `content/docs`: 所有笔记页面与 `meta.json` 导航配置。
- `lib/layout.shared.tsx`: 文档站顶部导航配置。
- `lib/shared.ts`: 站点名称和内容路由配置。
- `app/layout.tsx`: 全站元数据；部署时可通过 `NEXT_PUBLIC_SITE_URL` 设置正式域名。

## 设计系统

整站的视觉语言是**一张制图纸**:表面是平的,直角,任意两处之间的分隔都是一条 1px 细线。页面上唯一有饱和度的颜色是强调色,只用在标记、当前项和"正在绘制的线"上。

### 动效

两个文件描述同一套动效,改一处要同时改另一处:

- `lib/motion.ts`: 缓动与时长(`EASE` / `EASE_IN` / `EASE_DRAW`、`DUR`、`STAGGER`),供 React 组件使用。
- `app/global.css`: 同一组曲线以 `--ease-*` 暴露给 CSS,并覆盖 Fumadocs 自带的 `--animate-fd-*`。

原则:只有位移和线条生长,**没有缩放、没有回弹**。首屏幕布(`components/chrome/intro.tsx`)在 HTML 里就渲染好、由 `html[data-intro]` 决定是否播放,所以不会闪;页面切换(`components/chrome/page-enter.tsx`)由调用方传入的 `key` 触发重挂载,不拦截导航,链接行为与浏览器原生一致。

### 结构

- `components/sheet.tsx`: 全站共用的三个构件——`Rule`(自绘细线)、`Reveal`(进入视口时位移)、`Band`(带标尺的分区标题)。
- `components/home-page.tsx`: 首页。`Hero` 右侧是站点的堆栈标志,由刻线动画画出,独立存在、不含计数与说明;`技术目录` 是网格化的条目区,悬挂时行整体做一次平移动画。
- `components/line-card.tsx`: 正文里的 `Cards` / `Card`。它们是同一张表格的单元格,只画自己和相邻单元格共用的那条线,所以奇数个卡片不会留下灰色空档。
- `app/global.css`: 分八节——令牌、首屏幕布、首页、文档外壳、导航、正文、浮层、浏览器表面。所有 Fumadocs 选择器都写在这里,改样式优先改这个文件而不是去覆盖组件。

### 内容约定

- 代码块用 ```` ```lang tab="文件名" ```` 可以生成带文件头的标签页,样式已适配。
- `meta.json` 里的 `icon` 会渲染成侧边栏图标;`description` 用在侧边栏顶部的分类切换弹窗里。
