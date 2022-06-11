import React, { useCallback } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RichTextEditor from './RichTextEditor';

export default {
  title: 'EbuckleyK/Components/RichTextEditor',
  component: RichTextEditor
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (args) => <RichTextEditor {...args} />

export const Default = Template.bind({});

Default.args = {}