import { Text } from 'components/Text';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Text',
  component: Text,
  tags: ['autodocs'],
};

export const Size = {
  render: () => (
    <StoryContainer vertical>
      <Text size="xl">XLarge</Text>
      <Text size="l">Large</Text>
      <Text size="m">Medium</Text>
      <Text size="s">Small</Text>
    </StoryContainer>
  ),
};

export const Weight = {
  render: () => (
    <StoryContainer vertical>
      <Text weight="regular">Regular</Text>
      <Text weight="medium">Medium</Text>
      <Text weight="bold">Bold</Text>
    </StoryContainer>
  ),
};

export const Align = {
  render: () => (
    <StoryContainer vertical stretch>
      <Text align="start">Start</Text>
      <Text align="center">Center</Text>
    </StoryContainer>
  ),
};
