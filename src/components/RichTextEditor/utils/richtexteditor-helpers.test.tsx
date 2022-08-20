import { Descendant } from 'slate';
import { serializeToHTML, serializeToPlainText } from './richtexteditor-helpers'

const testnodes: Array<Descendant> | Array<any> = [
  {
    type: 'paragraph',
    children: [{ text: 'An opening paragraph...' }],
  },
  { 
    type: 'paragraph',
    children: [
      { text: 'This is bold text.', bold: true }, 
      { text: 'This is underlined text.', underline: true },
      { text: 'This is italicized text.', italic: true },
      { text: '{ var codeblock = true; }', code: true}]
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'A closing paragraph!' }],
  },
  {
    type: 'h1',
    children: [{ text: 'Heading1!' }],
  },
  {
    type: 'h2',
    children: [{ text: 'Heading2!' }],
  },
  {
    type: 'h3',
    children: [{ text: 'Heading3!' }],
  },
  {
    type: 'h4',
    children: [{ text: 'Heading4!' }],
  },
  {
    type: 'h5',
    children: [{ text: 'Heading5!' }],
  },
  {
    type: 'h6',
    children: [{ text: 'Heading6!' }],
  },
  {
    type: 'bulleted-list',
    children: [{ 
      type: 'list-item', 
      children: [{ text: 'A quote.'}]
    }, {
      type: 'list-item',
      children: [{ text: 'Another one'}]
    }]
  },
  {
    type: 'numbered-list',
    children: [{ 
      type: 'list-item', 
      children: [{ text: 'A quote.'}]
    }, {
      type: 'list-item',
      children: [{ text: 'Another one'}]
    }]
  }
]

describe('richtexteditor-helpers', () => {
  test('can serialize editor text to plaintext', () => {
    const str = serializeToPlainText(testnodes);
    expect(str).toContain('An opening paragraph...');
    expect(str).toContain('A wise quote.');
    expect(str).toContain('A closing paragraph!')
  })

  test('can serialize editor to html', () => {
    const str = serializeToHTML(testnodes);
    expect(str).toContain('<p>An opening paragraph...</p>')
    expect(str).toContain('<blockquote>A wise quote.</blockquote>')
    expect(str).toContain('<p>A closing paragraph!</p>')
    expect(str).toContain('<h1>Heading1!</h1>')
    expect(str).toContain('<h2>Heading2!</h2>')
    expect(str).toContain('<h3>Heading3!</h3>')
    expect(str).toContain('<h4>Heading4!</h4>')
    expect(str).toContain('<h5>Heading5!</h5>')
    expect(str).toContain('<h6>Heading6!</h6>')
    expect(str).toContain('<ul><li>A quote.</li><li>Another one</li></ul>')
    expect(str).toContain('<ol><li>A quote.</li><li>Another one</li></ol>')
    expect(str).toContain('<strong>This is bold text.</strong>')
    expect(str).toContain('<em>This is italicized text.</em>')
    expect(str).toContain('<pre><code>{ var codeblock = true; }</code></pre>')
    expect(str).toContain('<u>This is underlined text.</u>')
  })

  test('can serialize null or undefined editor text to plaintext', () => {
    const undefinedValue: any[] = [{"type": "paragraph", "children": [{"text": undefined }] }];
    const nullValue: any[] = [{"type": "paragraph", "children": [{"text": null }] }];
    const str = serializeToPlainText(undefinedValue);
    const str2 = serializeToPlainText(nullValue);
    const str3 = serializeToPlainText(null as any);
    const str4 = serializeToPlainText(undefined as any);
    expect(str).toBeFalsy();
    expect(str2).toBeFalsy();
    expect(str3).toBeFalsy();
    expect(str4).toBeFalsy();
  })

  test('can serialize null or undefined editor text to html', () => {
    const undefinedValue: any[] = [{"type": "paragraph", "children": [{"text": undefined }] }];
    const nullValue: any[] = [{"type": "paragraph", "children": [{"text": null }] }];
    const str = serializeToHTML(undefinedValue);
    const str2 = serializeToHTML(nullValue);
    const str3 = serializeToPlainText(null as any);
    const str4 = serializeToPlainText(undefined as any);
    expect(str).toBeFalsy();
    expect(str2).toBeFalsy();
    expect(str3).toBeFalsy();
    expect(str4).toBeFalsy();
  })
})