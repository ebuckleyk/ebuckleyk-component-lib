import { Box, Flex, FlexProps, IconButton, Stack, StylesProvider, Text } from '@chakra-ui/react';
import React, { ReactNode, useMemo } from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps, FileRejection, Accept } from 'react-dropzone';
import { CloseIcon } from '@chakra-ui/icons';

//#region defaults
const baseStyleDefault = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5px',
  borderWidth: 2,
  borderRadius: 10,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#ffffff',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyleDefault = {
  borderColor: '#2196f3'
};

const acceptStyleDefault = {
  borderColor: '#00e676'
};

const rejectStyleDefault = {
  borderColor: '#ff1744'
};

const fileItemStyleDefault : FlexProps = {
  boxShadow: 'md',
  h: 45,
  width:'100%',
  borderRadius: 10,
  alignItems: 'center',
  p: 2
}

function DefaultAreaLabel() {
  return (
    <p>
      Drag & Drop your files or{' '}
      <span style={{ textDecoration: 'underline', cursor: 'pointer'}}>Browse</span>
    </p>
  )
}
//#endregion

const defaultAreaProps : DropzoneRootProps = {
  minHeight: 65,
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column'
}

export interface ServerFile {
  id?: string,
  name: string,
  size: number,
  type: string,
  path: string
}

export interface FileDropProps {
  onAddFiles?: <T extends File>(files: T[]) => void,
  dropAreaProps?: DropzoneRootProps,
  dropInputProps?: DropzoneInputProps,
  dropAreaLabel?: ReactNode | string,
  files?: File[] | ServerFile[],
  onRemoveFile?: <T extends File>(file: T, index: number) => void,
  onSelectFile?: <T extends File>(file: T) => void,
  onError?: <T extends FileRejection>(files: T[]) => void,
  accept?: Accept,
  minSize?: number,
  maxSize?: number,
  maxFiles?: number,
  disabled?: boolean,
  baseStyle?: React.CSSProperties,
  focusedStyle?: React.CSSProperties,
  acceptedStyle?: React.CSSProperties,
  rejectedStyle?: React.CSSProperties,
  fileItemStyle?: FlexProps,
  onFocus?: () => void,
  onBlur?: () => void
}

export interface FileItemProps {
  file: File | ServerFile,
  onRemoveFile?: <T extends File>(file: T, index: number) => void,
  onSelectFile?: <T extends File>(file: T) => void,
  fileIndex: number,
  fileItemStyle?: FlexProps
}


function FileItem({ file, fileIndex, onRemoveFile, onSelectFile, fileItemStyle } : FileItemProps) {
  return (
    <Flex
      data-testid={`file-${fileIndex}`}
      {...fileItemStyle}>
      <IconButton
        data-testid={`remove-file-${fileIndex}`}
        onClick={() => onRemoveFile && onRemoveFile(file as File, fileIndex)}
        isRound
        aria-label='Remove file'
        icon={<CloseIcon h={3} w={3} />}
        size='xs'
        color='gray' />
      <Flex
        data-testid={`select-file-${fileIndex}`}
        w='100%'
        onClick={() => onSelectFile && onSelectFile(file as File)}
        ml={2}
        flexDir='column'>
        <Text fontSize='sm'>{file.name}</Text>
        <Text fontSize='xx-small'>{file.size / 1000} Kb</Text>
      </Flex>
    </Flex>
  )
}

function FileDrop({
  dropAreaLabel = <DefaultAreaLabel />,
  dropAreaProps = defaultAreaProps,
  dropInputProps,
  files = [],
  onAddFiles,
  onRemoveFile,
  onSelectFile,
  onError,
  accept,
  minSize,
  maxFiles,
  maxSize,
  disabled,
  onFocus,
  onBlur,
  baseStyle = baseStyleDefault as React.CSSProperties,
  rejectedStyle = rejectStyleDefault as React.CSSProperties,
  acceptedStyle = acceptStyleDefault as React.CSSProperties,
  focusedStyle = focusedStyleDefault as React.CSSProperties,
  fileItemStyle = fileItemStyleDefault
} : FileDropProps) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    maxFiles,
    maxSize,
    minSize,
    accept,
    disabled,
    onDropAccepted: onAddFiles,
    onDropRejected: onError,
    onDragEnter: onFocus,
    onDragLeave: onBlur,
    onFileDialogOpen: onFocus,
    onDrop: () => onBlur,
    onFileDialogCancel: onBlur
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptedStyle : {}),
      ...(isDragReject ? rejectedStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Box data-testid='FileDropContainer' style={style as React.CSSProperties} className='ebuckleyk-wrapper'>
      <Box
        data-testid='FileDrop_DropArea'
        className='ebuckleyk-filedroparea'
        {...getRootProps(dropAreaProps)}>
        <input data-testid='FileDrop_Input' {...getInputProps(dropInputProps)} />
        {dropAreaLabel}
      </Box>
      <Stack 
        data-testid='FileDrop_FileArea'
        w='100%'>
        {files?.map((f, idx) => (<FileItem key={idx} fileItemStyle={fileItemStyle} fileIndex={idx} file={f} onRemoveFile={onRemoveFile} onSelectFile={onSelectFile} />))}
      </Stack>
    </Box>
  )
}

export default FileDrop;
