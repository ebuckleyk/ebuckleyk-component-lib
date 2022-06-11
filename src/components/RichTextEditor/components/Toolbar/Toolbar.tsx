import React from 'react';
import { RiDoubleQuotesL, RiListUnordered, RiListOrdered, RiH1, RiH2, RiH3, RiH4, RiH5, RiH6, RiBold, RiItalic, RiUnderline, RiCodeSSlashLine, RiAlignLeft, RiAlignCenter, RiAlignRight, RiAlignJustify } from 'react-icons/ri';
import { Flex } from '@chakra-ui/layout';
import MarkButton from '../MarkButton/MarkButton';
import BlockButton from '../BlockButton/BlockButton';

type ToolbarOptionsConfig = {
  bold?: true,
  italic?: true,
  underline?: true,
  code?: true,
  h1?: true,
  h2?: true,
  h3?: true,
  h4?: true,
  h5?: true,
  h6?: true,
  bulletedList?: true,
  numberedList?: true,
  justifyLeft?: true,
  justifyRight?: true,
  justifyCenter?: true,
  justify?: true,
  blockQuote?: true
}

export type ToolbarProps = {
  show?: boolean,
  config?: ToolbarOptionsConfig
}

const Toolbar = ({ 
  show = true,
  config = {
    bold: true,
    italic: true,
    underline: true,
    code: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    bulletedList: true,
    numberedList: true,
    justifyLeft: true,
    justifyRight: true,
    justifyCenter: true,
    justify: true,
    blockQuote: true
  }
} : ToolbarProps) => {
  if (!show) return null;

  return (
    <Flex data-testid='RichTextEditor_Toolbar'>
      {config.bold && <MarkButton icon={<RiBold />} format='bold' />}
      {config.italic && <MarkButton icon={<RiItalic />} format='italic' />}
      {config.underline && <MarkButton icon={<RiUnderline />} format='underline' />}
      {config.code && <MarkButton icon={<RiCodeSSlashLine />} format='code' />}
      {config.h1 && <BlockButton icon={<RiH1 />} format='h1' />}
      {config.h2 && <BlockButton icon={<RiH2 />} format='h2' />}
      {config.h3 && <BlockButton icon={<RiH3 />} format='h3' />}
      {config.h4 && <BlockButton icon={<RiH4 />} format='h4' />}
      {config.h5 && <BlockButton icon={<RiH5 />} format='h5' />}
      {config.h6 && <BlockButton icon={<RiH6 />} format='h6' />}
      {config.bulletedList && <BlockButton icon={<RiListUnordered />} format='bulleted-list' />}
      {config.numberedList && <BlockButton icon={<RiListOrdered />} format='numbered-list' />}
      {config.justifyLeft && <BlockButton icon={<RiAlignLeft />} format='left' />}
      {config.justifyCenter && <BlockButton icon={<RiAlignCenter />} format='center' />}
      {config.justifyRight && <BlockButton icon={<RiAlignRight />} format='right' />}
      {config.justify && <BlockButton icon={<RiAlignJustify />} format='justify' />}
      {config.blockQuote && <BlockButton icon={<RiDoubleQuotesL />} format='block-quote' />}
    </Flex>
  )
}

export default Toolbar;