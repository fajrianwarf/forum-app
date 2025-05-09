import React from 'react';
import { Box, List } from '@mui/material';
import { LeaderboardItem } from '@components/LeaderboardItem';

export default {
  title: 'Components/LeaderboardItem',
  component: LeaderboardItem,
  argTypes: {
    index: { type: { name: 'number', required: true }, control: 'number' },
    score: { type: { name: 'number', required: true }, control: 'number' },
    isLast: { type: { name: 'boolean', required: false }, control: 'boolean' },
    user: { type: { name: 'object', required: true }, control: 'object' },
  },
};

const Template = (args) => (
  <Box maxWidth={400}>
    <List>
      <LeaderboardItem {...args} />
    </List>
  </Box>
);

const defaultUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  avatar: 'https://ui-avatars.com/api/?name=jane&background=random',
};

export const WithDivider = Template.bind({});
WithDivider.args = {
  index: 0,
  score: 1200,
  isLast: false,
  user: defaultUser,
};

export const WithoutDivider = Template.bind({});
WithoutDivider.args = {
  index: 1,
  score: 950,
  isLast: true,
  user: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: 'https://ui-avatars.com/api/?name=john&background=random',
  },
};
