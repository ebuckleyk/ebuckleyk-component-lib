import React from 'react';
import RichTextEditor from './RichTextEditor';
import { setupRichTextEditor } from '../../../test/setup';
import { Descendant } from 'slate';

const richtext: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

describe('RichTextEditor', () => {
  test('renders the RichTextEditor component', () => {
    const { container } = setupRichTextEditor(RichTextEditor, {});
    const editor = container.querySelector('[data-slate-editor="true"]')
    expect(editor).toBeDefined();
  })

  test('renders placeholder text', () => {
    const PLACEHOLDER = 'JEST Unit Tests';
    const { container } = setupRichTextEditor(RichTextEditor, { placeholder: PLACEHOLDER});
    const placeholder = container.querySelector('[data-slate-placeholder="true"]')
    expect(placeholder?.textContent).toEqual(PLACEHOLDER);
  })

  test('only displays rendered html when in readOnly mode', () => {
    const { getByTestId } = setupRichTextEditor(RichTextEditor, { initialValue: richtext, readOnly: true });
    const readonlyRichText = getByTestId('RichTextEditor_Textbox readonly');
    const getSerializedHtml = getByTestId('slate-serialized-html');

    expect(getSerializedHtml).toBeInTheDocument();
    expect(readonlyRichText).toBeTruthy();
  })
})