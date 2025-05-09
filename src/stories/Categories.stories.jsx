import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Categories } from '@components/Categories';

export default {
  title: 'Components/Categories',
  component: Categories,
  argTypes: {
    categories: {
      type: { name: 'string[]', required: true },
      control: 'array',
    },
    selected: {
      type: { name: 'string', required: false },
      control: false,
    },
    onSelect: {
      type: { name: '(category: string | null) => void', required: true },
      action: 'onSelect',
      control: false,
    },
  },
};

const Template = (args) => {
  const [selected, setSelected] = useState(null);

  return (
    <Box maxWidth={400}>
      <Categories
        {...args}
        selected={selected}
        onSelect={(val) => {
          args.onSelect?.(val); // triggers Storybook Actions panel
          setSelected(val);
        }}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  categories: ['UI', 'UX', 'Frontend', 'Backend', 'React'],
};
