import { List } from 'components/List';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import { ListItem } from './List';

export default {
  title: 'List',
  component: List,
  tags: ['autodocs'],
};

const Story = args => (
  <StoryContainer>
    <List {...args}>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
  </StoryContainer>
);

export const Unordered = {
  args: { ordered: false },
  render: Story,
};

export const Ordered = {
  args: { ordered: true },
  render: Story,
};
