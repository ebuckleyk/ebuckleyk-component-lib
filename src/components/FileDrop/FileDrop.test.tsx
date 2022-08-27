import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { setupFileDrop } from '../../../test/setup'

import FileDrop from './FileDrop';
import { act } from 'react-dom/test-utils';
import { FileRejection } from 'react-dropzone';
import { EditIcon } from '@chakra-ui/icons';

const f = {
  path: '',
  name: 'test name',
  size: 1000,
  type: 'application/pdf'
}

describe('FileDrop', () => {
  test('renders empty files in file area', () => {
    const { getByTestId } = setupFileDrop(FileDrop, {})
    const fileArea = getByTestId('FileDrop_FileArea');
    expect(fileArea.firstChild).toBeFalsy();
  })

  test('renders files in file area', () => {
    const { getByTestId } = render(<FileDrop files={[f]} />)
    const fileArea = getByTestId('FileDrop_FileArea');
    expect(fileArea.firstChild).toBeTruthy();
    expect(getByTestId('file-0')).toBeDefined();
  })

  test('can remove added file from file area', async () => {
    const { getByTestId, onRemoveFile } = setupFileDrop(FileDrop, { files: [f]});
    const removeFileButton = getByTestId('remove-file-0');
    await removeFileButton.click();
    expect(onRemoveFile).toBeCalled();
    const fileArea = getByTestId('FileDrop_FileArea');
    expect(fileArea.firstChild).toBeFalsy();
  })

  test('can get file utilizing onSelect file action', async () => {
    let selectedFile: File | undefined;
    const onSelectFileTestFunc = (f: File) => selectedFile = f; 
    const { getByTestId, onSelectFile} = setupFileDrop(FileDrop, { files: [f], onSelectFile: onSelectFileTestFunc});
    const selectFileButton = getByTestId('select-file-0');
    await selectFileButton.click();
    expect(onSelectFile).toBeCalled();
    expect(selectedFile).toBeDefined();
    expect(selectedFile?.name).toEqual(f.name);
  })

  test('can drop file in area', async () => {
    const file = new File(['file'], 'testfile.pdf', {
      type: 'application/pdf'
    });
    const { getByTestId, onAddFiles } = setupFileDrop(FileDrop, { files: []});
    const inputEl = getByTestId('FileDrop_Input');

    Object.defineProperty(inputEl, 'files', {
      value: [file]
    });

    await act(async () => {
      fireEvent.drop(inputEl);
    })

    expect(onAddFiles).toBeCalled();
    const fileArea = getByTestId('FileDrop_FileArea');
    expect(fileArea.firstChild).toBeTruthy()
  })

  test('can reject unaccepted files and capture error', async () => {
    let error: FileRejection[] | undefined;
    const onErrorTestFunc = (r: FileRejection[]) => error = r; 
    const file = new File(['file'], 'testfile.pdf', {
      type: 'application/pdf'
    });

    const { getByTestId, onAddFiles, onError } = setupFileDrop(
      FileDrop,
      {
        focusedStyle: { width: '100%'},
        onError: onErrorTestFunc,
        accept: {['image/png']: []}, 
        files: []
      });
    const inputEl = getByTestId('FileDrop_Input');

    Object.defineProperty(inputEl, 'files', {
      value: [file]
    });

    await act(async () => {
      fireEvent.drop(inputEl);
    })

    expect(onAddFiles).toBeCalledTimes(0);
    expect(onError).toBeCalled();
    const fileArea = getByTestId('FileDrop_FileArea');
    expect(fileArea.firstChild).toBeFalsy();
    expect(error).toBeDefined();
  })

  test('can accept custom display component', async () => {
    const { getByTestId } = setupFileDrop(FileDrop, {
      dropAreaComponent: <EditIcon data-testid='edit-icon' />,
      displayFileArea: false,
      dropAreaProps: { width: 'fit-content' },
      baseStyle: {}
    })

    const customComponent = getByTestId('edit-icon');
    expect(customComponent).toBeTruthy();
  })

  test('can exclude file drop area', async () => {
    const file = new File(['file'], 'testfile.pdf', {
      type: 'application/pdf'
    });
    const { queryByTestId, getByTestId, onAddFiles } = setupFileDrop(FileDrop, {displayFileArea: false})
    const inputEl = getByTestId('FileDrop_Input');

    Object.defineProperty(inputEl, 'files', {
      value: [file]
    });

    await act(async () => {
      fireEvent.drop(inputEl);
    })
    const fileArea = queryByTestId('FileDrop_FileArea')
    expect(onAddFiles).toBeCalled();
    expect(fileArea).toBeFalsy();
  })
})