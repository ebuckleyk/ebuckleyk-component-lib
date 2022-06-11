import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileDrop from './FileDrop';

export default {
  title: 'EbuckleyK/Components/FileDrop',
  component: FileDrop
} as ComponentMeta<typeof FileDrop>;

const Template: ComponentStory<typeof FileDrop> = (args) => <FileDrop {...args} />

export const Default = Template.bind({});

Default.args = {
  files: [{ path: 'This is a test path', size: 112394, name: 'This is a test file', type: 'application/pdf'}]
}