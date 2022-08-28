import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RichTextEditor from './RichTextEditor';

const richtext = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

export default {
  title: 'EbuckleyK/Components/RichTextEditor',
  component: RichTextEditor
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (args) => <RichTextEditor {...args} />

export const Default = Template.bind({});
export const WithRichText = Template.bind({})
export const ReadOnly = Template.bind({});

Default.args = {
}

WithRichText.args = {
  initialValue: richtext
}

ReadOnly.args = {
  initialValue: richtext,
  readOnly: true
}