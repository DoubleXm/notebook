import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Intro } from '@/components/chrome/intro';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: '栈记 · 全栈开发笔记',
    template: '%s | 栈记',
  },
  description:
    '按技术方向浏览前端、后端、数据库、运维与 AI 等开发笔记，或搜索具体主题。',
};

/**
 * Decides whether the first-load curtain plays, before the body is parsed, so
 * the sheet never flashes underneath it. Same pattern as a theme script: the
 * markup ships in the HTML and this only tags the document.
 */
const introScript = `(function(){var r=document.documentElement;try{var done=false;try{done=sessionStorage.getItem('stacknote:intro')==='done'}catch(e){}var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;r.dataset.intro=done||still?'skip':'play'}catch(e){r.dataset.intro='skip'}})();`;

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
          <Intro />
        </RootProvider>
      </body>
    </html>
  );
}
