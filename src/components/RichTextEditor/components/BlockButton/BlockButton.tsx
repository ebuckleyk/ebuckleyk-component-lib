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
  return (
    <IconButton
      icon={icon}
      isActive={utils.isBlockActive(editor, format)}
      onClick={() => utils.toggleBlock(editor, format)}
      aria-label={format} />
  )
}

export default BlockButton;