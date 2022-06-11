import React from 'react';
import { IconButton } from '@chakra-ui/button';
import { useSlate } from 'slate-react';
import * as utils from '../../slate-utils';

type MarkButtonProps = {
  icon: JSX.Element,
  format: string
}

const MarkButton = ({ format, icon } : MarkButtonProps) => {
  const editor = useSlate();
  return (
    <IconButton
      data-testid={`RichTextEditor_Toolbar_${format}`}
      isActive={utils.isMarkActive(editor, format)}
      onClick={() => utils.toggleMark(editor, format)}
      aria-label={format}
      icon={icon} />
  )
}

export default MarkButton;