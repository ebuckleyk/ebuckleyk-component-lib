import React, { useState } from 'react'
import { act, render } from '@testing-library/react';
import { FileDropProps } from '../src/components/FileDrop/FileDrop';
import { RichTextEditorProps } from '../src/components/RichTextEditor/RichTextEditor';

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