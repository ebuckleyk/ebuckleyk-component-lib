import React, { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileDrop from './FileDrop';

export default {
  title: 'EbuckleyK/Components/FileDrop',
  component: FileDrop
} as ComponentMeta<typeof FileDrop>;

const Template: ComponentStory<typeof FileDrop> = (args) => {
  const [files, setFiles] = useState(args.files)
  return (
    <FileDrop {...args} files={files} onAddFiles={(f) => setFiles((prev) => [...(prev || []), ...f] as any)} />
  )
}

export const Default = Template.bind({});
export const WithFiles = Template.bind({});
export const WithCustomDropAreaLabel = Template.bind({});

const file1 = new File(['file1'], 'testfile1.pdf', {
  type: 'application/pdf'
});

const file2 = new File(['file2'], 'image.png', {
  type: 'application/png'
})

Default.args = {
  files: []
}

WithFiles.args = {
  files: [file1, file2]
}

WithCustomDropAreaLabel.args = {
  dropAreaComponent: <EditIcon _hover={{ cursor: 'pointer'}} />,
  displayFileArea: false,
  dropAreaProps: { width: 'fit-content' },
  baseStyle: {},
  onAddFiles: (files) => console.log({ files })
}
