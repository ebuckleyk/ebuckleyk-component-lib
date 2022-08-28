import React, { useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderPlaceholderProps } from 'slate-react';
import { withHistory } from 'slate-history';
import { isHotkey } from 'is-hotkey'
import { Box } from '@chakra-ui/layout';
import DOMPurify from 'dompurify';
import Toolbar, { ToolbarProps } from "./components/Toolbar/Toolbar";
import * as utils from './utils/slate-utils';
import { RichTextHelpers } from '.';

import './RichTextEditor.css'


const HOTKEYS: {[key: string]: string} = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
}

export const INIT_VALUE: Descendant[] = [{
  type: 'paragraph',
  children: [{ text: '' }]
}];

export type RichTextEditorProps = {
  placeholder?: string,
  spellCheck?: boolean,
  autoFocus?: boolean,
  readOnly?: boolean,
  renderPlaceholder?: (props: RenderPlaceholderProps) => JSX.Element,
  toolbar?: ToolbarProps,
  initialValue?: Descendant[],
  onChange?: ((value: Descendant[]) => void) | undefined,
  onFocus?: () => void,
  onBlur?: () => void,
  style?: React.CSSProperties,
  disabled?: boolean
}

const DefaultStyle: React.CSSProperties = {
  border: '1px solid',
  borderColor: '#C8C8C8',
  padding: '8px 8px',
  borderRadius: '5px',
  minHeight: '80px',
  maxHeight: '250px',
  overflowX: 'hidden',
  overflowY: 'auto'
}

function ReadOnlyRichTextEditor({ value, style }: {value: Descendant[], style: React.CSSProperties }) {
  const richtext = value ? RichTextHelpers.serializeToHTML(value) : '<p></p>';
  return (
    <Box
      data-testid='RichTextEditor_Textbox readonly'
      className='slate-editor readonly'>
      <div
        style={style}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(richtext)
        }}
      />
    </Box>
  )
}

function RichTextEditor({ 
  placeholder,
  spellCheck = true,
  autoFocus,
  readOnly,
  disabled,
  renderPlaceholder,
  toolbar,
  initialValue = INIT_VALUE,
  onChange,
  onBlur,
  onFocus,
  style = DefaultStyle
} : RichTextEditorProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  if (readOnly) return <ReadOnlyRichTextEditor value={initialValue} style={style} />

  return (
    <Slate
      editor={editor}
      onChange={onChange}
      value={initialValue}>
      <Toolbar {...toolbar} />
      <Editable
        style={style}
        data-testid='RichTextEditor_Textbox'
        role='textbox'
        onFocus={onFocus}
        onBlur={onBlur}
        className='slate-editor'
        renderPlaceholder={renderPlaceholder}
        readOnly={disabled}
        spellCheck={spellCheck}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onKeyDown={(event) => {
          for (const hotKey in HOTKEYS) {
            if (isHotkey(hotKey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotKey];
              utils.toggleMark(editor, mark)
            }
          }
        }}
        renderElement={utils.renderElement}
        renderLeaf={utils.renderLeaf}
        />
    </Slate>
  )
}

export default RichTextEditor;