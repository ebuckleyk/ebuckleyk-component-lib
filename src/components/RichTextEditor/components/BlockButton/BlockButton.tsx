import React from 'react';
import { IconButton } from "@chakra-ui/button";
import { useSlate } from "slate-react"
import * as utils from '../../slate-utils';

type BlockButtonProps = {
  format: string,
  icon: JSX.Element
}

const BlockButton = ({ format, icon } : BlockButtonProps) => {
  const editor = useSlate();
  const isActive = utils.isBlockActive(editor, format)
  return (
    <IconButton
      data-testid={`RichTextEditor_Toolbar_${format}`}
      size={'sm'}
      variant={isActive ? 'solid' : 'outline'}
      icon={icon}
      isActive={isActive}
      onClick={() => utils.toggleBlock(editor, format)}
      aria-label={format} />
  )
}

export default BlockButton;