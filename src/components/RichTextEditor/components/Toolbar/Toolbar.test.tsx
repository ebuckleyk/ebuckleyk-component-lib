import Toolbar, { DefaultToolbarConfig } from './Toolbar';
import { setupRichTextToolbar } from '../../../../../test/setup';

const toggle_buttons = [
  'bold', 'italic', 'underline','code', 'block-quote',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'bulleted-list', 'numbered-list',
  'left', 'center', 'right', 'justify'
]

const visible_buttons = [
  'bold', 'italic', 'block-quote',
  'h1', 'h2',
  'bulleted-list',
  'left', 'center', 'justify'
]

const hidden_buttons = [
  'underline','code',
  'h3', 'h4', 'h5', 'h6',
  'numbered-list',
  'right'
]

describe('Toolbar', () => {
  test('renders the Toolbar component', () => {
    const { getByTestId } = setupRichTextToolbar(Toolbar, {});
    const toolbar = getByTestId('RichTextEditor_Toolbar');
    expect(toolbar).toBeDefined()
  })

  test('renders individual toggle buttons', () => {
    const { getByTestId } = setupRichTextToolbar(Toolbar, {});
    toggle_buttons.forEach(toggle => {
      const button = getByTestId(`RichTextEditor_Toolbar_${toggle}`);
      expect(button).toBeDefined();
    })
  })

  test('renders toolbar toggle buttons per configuration', () => {
    const hiddenButtons = hidden_buttons.reduce((prev, cur) => { prev[cur] = false; return prev }, {})
    const { getByTestId, queryByTestId } = setupRichTextToolbar(Toolbar, { config: {...DefaultToolbarConfig , ...hiddenButtons}});
    visible_buttons.forEach(toggle => {
      const button = getByTestId(`RichTextEditor_Toolbar_${toggle}`);
      expect(button).toBeDefined();
    })

    hidden_buttons.forEach(toggle => {
      const button = queryByTestId(`RichTextEditor_Toolbar_${toggle}`);
      expect(button).toBeFalsy()
    })
  })

  test('can hide toolbar', () => {
    const { queryByTestId } = setupRichTextToolbar(Toolbar, { show: false });
    const toolbar = queryByTestId('RichTextEditor_Toolbar');
    expect(toolbar).toBeFalsy()
  })
})