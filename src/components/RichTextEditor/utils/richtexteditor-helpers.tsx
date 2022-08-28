import escapeHtml from 'escape-html';
import { Descendant, Node, Text } from 'slate';

export const serializeToPlainText = (nodes: Node[]): string => {
  if (!nodes?.length) return '';
  return nodes.map(n => Node.isNode(n) ? Node.string(n) : '').join('\n');
}

const _serialize = (node: Descendant) : string => {
  if (Text.isText(node)) {
    let str = escapeHtml(node.text);
    if (node.bold) str = `<strong>${str}</strong>`;
    if (node.italic) str = `<em>${str}</em>`;
    if (node.code) str = `<pre><code>${str}</code></pre>`;
    if (node.underline) str = `<u>${str}</u>`;
    return str;
  }

  const children = node.children?.map(n => _serialize(n as any)).join('');

  switch (node.type) {
    case 'block-quote': return `<blockquote>${children}</blockquote>`;
    case 'bulleted-list': return `<ul>${children}</ul>`;
    case 'numbered-list': return `<ol>${children}</ol>`;
    case 'list-item': return `<li>${children}</li>`;
    case 'h1': return `<h1>${children}</h1>`
    case 'h2': return `<h2>${children}</h2>`
    case 'h3': return `<h3>${children}</h3>`
    case 'h4': return `<h4>${children}</h4>`
    case 'h5': return `<h5>${children}</h5>`
    case 'h6': return `<h6>${children}</h6>`
    default: return `<p>${children}</p>`;
  }
}
export const serializeToHTML = (nodes: Node[]) : string => {
  if(!nodes?.length) return '';
  const result = nodes.map(n => Node.isNode(n) ? _serialize(n as any) : '').join('');
  return result ? `<span data-testid='slate-serialized-html'>${result}</span>` : '';
}