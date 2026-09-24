import { source } from '@/lib/source';
import { HomePage, type Entry } from '@/components/home-page';

type TreeNode = ReturnType<typeof source.getPageTree>['children'][number];

/** The first real page under a node — sections here have no index of their own. */
function firstUrl(node: TreeNode): string | undefined {
  if (node.type === 'page') return node.url;
  if (node.type !== 'folder') return undefined;
  if (node.index) return node.index.url;

  for (const child of node.children) {
    const url = firstUrl(child);
    if (url) return url;
  }

  return undefined;
}

function titleOf(node: TreeNode, fallback: string) {
  return typeof node.name === 'string' && node.name ? node.name : fallback;
}

export default function Page() {
  const tree = source.getPageTree();
  const sections: Entry[] = [];
  const deepDives: Entry[] = [];

  for (const node of tree.children) {
    if (node.type !== 'folder' || !node.$id) continue;

    const href = firstUrl(node);
    if (!href) continue;

    sections.push({
      id: node.$id,
      title: titleOf(node, node.$id),
      icon: node.icon,
      description: node.description,
      href,
    });

    // One level deeper: the named sub-collections worth jumping straight into.
    for (const child of node.children) {
      if (child.type !== 'folder' || !child.$id) continue;

      const childHref = firstUrl(child);
      if (!childHref) continue;

      deepDives.push({
        id: child.$id,
        title: titleOf(child, child.$id),
        href: childHref,
      });
    }
  }

  return <HomePage sections={sections} deepDives={deepDives} />;
}
