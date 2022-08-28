import React, { ReactNode, useMemo } from 'react';
import { Box, Flex, FlexProps, Stack, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
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

export type FileDropProps = {
  onAddFiles?: <T extends File>(files: T[]) => void,
  dropAreaProps?: DropzoneRootProps,
  dropInputProps?: DropzoneInputProps,
  dropAreaComponent?: ReactNode | string,
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
  onBlur?: () => void,
  displayFileArea?: boolean,
  readOnly?: boolean
}

export type FileItemProps = {
  file: File | ServerFile,
  onRemoveFile?: <T extends File>(file: T, index: number) => void,
  onSelectFile?: <T extends File>(file: T) => void,
  fileIndex: number,
  fileItemStyle?: FlexProps,
  disabled?: boolean
}

type FileDropContainerProps = {
  children: React.ReactNode,
  style: React.CSSProperties
}

type AreaFileProps = {
  onRemoveFile?: <T extends File>(file: T, index: number) => void,
  onSelectFile?: <T extends File>(file: T) => void,
  styles?: FlexProps,
  files: File[] | ServerFile[],
  isVisible?: boolean
}

function FileDropContainer({ children, style }: FileDropContainerProps) {
  return (
    <div
      style={style}
      className='filedrop-wrapper'
      data-testid='FileDropContainer'>
      {children}
    </div>
  )
}

function FileRemovalIcon({ onRemoveFile, fileIndex, file, disabled } : Pick<FileItemProps, 'onRemoveFile' | 'fileIndex' | 'file' | 'disabled' >) {
  if (!onRemoveFile || disabled) return null;
  return (
    <IconButton
      data-testid={`remove-file-${fileIndex}`}
      onClick={() => onRemoveFile(file as File, fileIndex)}
      isRound
      aria-label='Remove file'
      icon={<CloseIcon h={3} w={3} />}
      size='xs'
      color='gray' />
  )
}

function FileItem({ file, fileIndex, onRemoveFile, onSelectFile, fileItemStyle, disabled } : FileItemProps) {
  return (
    <Flex
      _hover={{
        cursor: onSelectFile ? 'pointer' : 'default'
      }}
      data-testid={`file-${fileIndex}`}
      {...fileItemStyle}>
      <FileRemovalIcon onRemoveFile={onRemoveFile} file={file} fileIndex={fileIndex} disabled={disabled} />
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

function AreaFiles({ files = [], styles, onRemoveFile, onSelectFile, isVisible = true, disabled } : AreaFileProps & Pick<FileDropProps, 'disabled'>) {
  if (!isVisible) return null;
  return (
    <Stack 
      data-testid='FileDrop_FileArea'
      w='100%'>
      {files.map((f, idx) => {
        return (
          <FileItem
            disabled={disabled}
            key={idx}
            fileItemStyle={styles}
            fileIndex={idx}
            file={f}
            onRemoveFile={onRemoveFile}
            onSelectFile={onSelectFile} />
        )
      })}
    </Stack>
  )
}

function ReadOnlyFileDrop({ files, onSelectFile, styles } : Pick<AreaFileProps, 'files' | 'onSelectFile' | 'styles'>) {
  return (
    <Stack
      data-testid='FileDrop_FileArea readonly'
      w='100%'>
      {files.map((f, idx) => {
        return (
          <FileItem
            file={f}
            key={idx}
            fileItemStyle={styles}
            fileIndex={idx}
            onSelectFile={onSelectFile} />
        )
      })}
    </Stack>
  )
}

function FileDrop({
  dropAreaComponent = <DefaultAreaLabel />,
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
  readOnly,
  displayFileArea = true,
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

  const style: React.CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptedStyle : {}),
      ...(isDragReject ? rejectedStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  if (readOnly) return <ReadOnlyFileDrop files={files} styles={fileItemStyle} onSelectFile={onSelectFile} />
  
  return (
    <FileDropContainer style={style}>
      <Box
        data-testid='FileDrop_DropArea'
        className='ebuckleyk-filedroparea'
        {...getRootProps(dropAreaProps)}>
        <input data-testid='FileDrop_Input' {...getInputProps(dropInputProps)} />
        {dropAreaComponent}
      </Box>
      <AreaFiles
        disabled={disabled}
        isVisible={displayFileArea}
        files={files}
        styles={fileItemStyle}
        onRemoveFile={onRemoveFile}
        onSelectFile={onSelectFile}
      />
    </FileDropContainer>
  )
}

export default FileDrop;
