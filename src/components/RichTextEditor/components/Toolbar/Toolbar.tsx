import React from 'react';
import { RiDoubleQuotesL, RiListUnordered, RiListOrdered, RiH1, RiH2, RiH3, RiH4, RiH5, RiH6, RiBold, RiItalic, RiUnderline, RiCodeSSlashLine, RiAlignLeft, RiAlignCenter, RiAlignRight, RiAlignJustify } from 'react-icons/ri';
import { Flex, HStack, Stack } from '@chakra-ui/layout';
import MarkButton from '../MarkButton/MarkButton';
import BlockButton from '../BlockButton/BlockButton';

type ToolbarOptionsConfig = {
  bold?: boolean,
  italic?: boolean,
  underline?: boolean,
  code?: boolean,
  h1?: boolean,
  h2?: boolean,
  h3?: boolean,
  h4?: boolean,
  h5?: boolean,
  h6?: boolean,
  'bulleted-list'?: boolean,
  'numbered-list'?: boolean,
  left?: boolean,
  right?: boolean,
  center?: boolean,
  justify?: boolean,
  'block-quote'?: boolean
}

export type ToolbarProps = {
  show?: boolean,
  config?: ToolbarOptionsConfig,
  style?: React.CSSProperties
}

export const DefaultToolbarConfig = {
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
  'bulleted-list': true,
  'numbered-list': true,
  left: true,
  right: true,
  center: true,
  justify: true,
  'block-quote': true
}

const DefaultStyle: React.CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
  width: '100%'
}

const Toolbar = ({ 
  show = true,
  config = DefaultToolbarConfig,
  style = DefaultStyle
} : ToolbarProps) => {
  if (!show) return null;

  return (
    <Flex data-testid='RichTextEditor_Toolbar' style={style}>
      <Stack direction={{sm: 'column', md: 'row'}}>
        <HStack spacing={1}>
          {config.bold && <MarkButton icon={<RiBold />} format='bold' />}
          {config.italic && <MarkButton icon={<RiItalic />} format='italic' />}
          {config.underline && <MarkButton icon={<RiUnderline />} format='underline' />}
          {config.code && <MarkButton icon={<RiCodeSSlashLine />} format='code' />}
          {config['block-quote'] && <BlockButton icon={<RiDoubleQuotesL />} format='block-quote' />}
        </HStack>
        <HStack spacing={1}>
          {config.h1 && <BlockButton icon={<RiH1 />} format='h1' />}
          {config.h2 && <BlockButton icon={<RiH2 />} format='h2' />}
          {config.h3 && <BlockButton icon={<RiH3 />} format='h3' />}
          {config.h4 && <BlockButton icon={<RiH4 />} format='h4' />}
          {config.h5 && <BlockButton icon={<RiH5 />} format='h5' />}
          {config.h6 && <BlockButton icon={<RiH6 />} format='h6' />}
        </HStack>
        <HStack spacing={1}>
          {config['bulleted-list'] && <BlockButton icon={<RiListUnordered />} format='bulleted-list' />}
          {config['numbered-list'] && <BlockButton icon={<RiListOrdered />} format='numbered-list' />}
          {config.left && <BlockButton icon={<RiAlignLeft />} format='left' />}
          {config.center && <BlockButton icon={<RiAlignCenter />} format='center' />}
          {config.right && <BlockButton icon={<RiAlignRight />} format='right' />}
          {config.justify && <BlockButton icon={<RiAlignJustify />} format='justify' />}
        </HStack>
      </Stack>
    </Flex>
  )
}

export default Toolbar;