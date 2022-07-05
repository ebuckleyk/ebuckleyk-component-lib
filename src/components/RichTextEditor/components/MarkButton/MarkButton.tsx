import React from 'react';
import { IconButton } from '@chakra-ui/button';
import { useSlate } from 'slate-react';
import * as utils from '../../utils/slate-utils';

type MarkButtonProps = {
  icon: JSX.Element,
  format: string
}

const MarkButton = ({ format, icon } : MarkButtonProps) => {
  const editor = useSlate();
  const isActive = utils.isMarkActive(editor, format)
  return (
    <IconButton
      size={'sm'}
      variant={isActive ? 'solid' : 'outline'}
      data-testid={`RichTextEditor_Toolbar_${format}`}
      isActive={isActive}
      onClick={() => utils.toggleMark(editor, format)}
      aria-label={format}
      icon={icon} />
  )
}

export default MarkButton;