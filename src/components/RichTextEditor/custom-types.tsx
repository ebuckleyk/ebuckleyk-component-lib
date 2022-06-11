import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

type FormattedText = { text: string; bold?: true, italic?: true, underline?: true, code?: true }
type CustomText = FormattedText

type ParagraphElement = {
  type: 'paragraph' | 'list-item',
  align?: 'left' | 'center' | 'right' | 'justify' | undefined,
  children: CustomText[]
}

type HeadingElement = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  align?: 'left' | 'center' | 'right' | 'justify' | undefined,
  level: number,
  children: CustomText[]
}

type CodeElement = {
  type: 'code',
  align?: 'left' | 'center' | 'right' | 'justify' | undefined,
  children: CustomText[]
}

type ListElement = {
  type: 'bulleted-list' | 'numbered-list',
  align?: 'left' | 'center' | 'right' | 'justify' | undefined,
  children: CustomText[]
}

type QuoteElement = {
  type: 'block-quote',
  align?: 'left' | 'center' | 'right' | 'justify' | undefined,
  children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingElement | CodeElement | ListElement | QuoteElement;

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}