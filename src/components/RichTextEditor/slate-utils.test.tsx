
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { renderElement, renderLeaf } from './slate-utils';

function getRenderElementProps(elementType : string) : RenderElementProps {
  return ({
    element: {
      type: elementType as any,
      children: []
    },
    attributes: {
      'data-slate-node': 'element',
      dir: 'rtl',
      ref: undefined
    },
    children: []
  })
}

function getRenderLeafProps(mark: string) : RenderLeafProps {
  return ({
    children: [],
    leaf: {
      [mark]: true,
      text: ''
    },
    text: { text: ''},
    attributes: {
      'data-slate-leaf': true
    }
  })
}

const supportedElements = {
  blockquote: { type: 'block-quote' },
  ul: { type: 'bulleted-list' },
  ol: { type: 'numbered-list' },
  li: { type: 'list-item' },
  h1: { type: 'h1' },
  h2: { type: 'h2' },
  h3: { type: 'h3' },
  h4: { type: 'h4' },
  h5: { type: 'h5' },
  h6: { type: 'h6' },
  code: { type: 'code', expected: 'pre' },
  p: { type: 'p' }
}

const suppportedMarks = {
  bold: { type: 'strong' },
  italic: { type: 'em' },
  code: { type: 'code' },
  underline: { type: 'u' }
}

describe('slate-utils', () => {
  Object.keys(supportedElements).forEach(elementKey => {
    test(`can render ${elementKey} element correctly`, () => {
      const element = renderElement(getRenderElementProps(supportedElements[elementKey].type))
      expect(element.type).toEqual(supportedElements[elementKey].expected || elementKey);
      expect(element.props['dir']).toEqual('rtl');
    })
  })

  Object.keys(suppportedMarks).forEach(markKey => {
    test(`can render ${markKey} mark correctly`, () => {
      const element = renderLeaf(getRenderLeafProps(markKey));
      // All elements are wrapped in <span> so check the inner element type
      expect(element.props.children.type).toEqual(suppportedMarks[markKey].type)
    })
  })
})