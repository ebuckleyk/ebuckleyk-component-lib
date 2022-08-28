import '@testing-library/jest-dom';
import React, { useState, useMemo } from 'react'
import { act, render } from '@testing-library/react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { FileDropProps } from '../src/components/FileDrop/FileDrop';
import { INIT_VALUE, RichTextEditorProps } from '../src/components/RichTextEditor/RichTextEditor';
import { ToolbarProps } from '../src/components/RichTextEditor/components/Toolbar/Toolbar';

export function setupFileDrop<P extends FileDropProps>(Component : React.ComponentType<P>, props : FileDropProps) { 
  let onRemoveFile;
  let onSelectFile;
  let onAddFiles;
  let onError;
  function TestEnvironment() {
    const [stateFiles, setStateFiles] = useState(props.files);

    onError = jest.fn(props.onError);
    onAddFiles = jest.fn((files) => act(() => {
      setStateFiles((prev) => [...(prev || []), ...files])
    }))
    onRemoveFile = jest.fn(() => act(() => {
      setStateFiles([])
    }))
    onSelectFile = jest.fn(props.onSelectFile)
    return (
      <Component
        {...props as P}
        onError={onError}
        onRemoveFile={onRemoveFile}
        files={stateFiles}
        onSelectFile={onSelectFile}
        onAddFiles={onAddFiles} />
      )
  }
  const renderObj = render(<TestEnvironment />);
  return {...renderObj, onRemoveFile, onSelectFile, onAddFiles, onError}
}

export function setupRichTextEditor<P extends RichTextEditorProps>(Component : React.ComponentType<P>, props: RichTextEditorProps) {
  function TestEnvironment() {
    return (
      <Component {...props as P} />
    )
  }
  const renderObj = render(<TestEnvironment />);
  return {...renderObj}
}

export function setupRichTextToolbar<P extends ToolbarProps>(Component : React.ComponentType<P>, props: ToolbarProps) {
  function TestEnvironment() {
    const editor = useMemo(() => withReact(createEditor()), []);
    return (
      <Slate editor={editor} value={INIT_VALUE}>
        <Component {...props as P} />
      </Slate>
    )
  }
  const renderObj = render(<TestEnvironment />);
  return {...renderObj}
}