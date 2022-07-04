import RichTextEditor from './RichTextEditor';
import { setupRichTextEditor } from '../../../test/setup';

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
})