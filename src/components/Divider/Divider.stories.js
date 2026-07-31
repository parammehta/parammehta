import { Divider } from 'components/Divider';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Divider',
  component: Divider,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <StoryContainer vertical stretch>
      <Divider />
    </StoryContainer>
  ),
};

export const Light = {
  render: () => (
    <StoryContainer vertical stretch>
      <Divider light notch={false} />
    </StoryContainer>
  ),
};

export const Collapsed = {
  render: () => (
    <StoryContainer vertical stretch>
      <Divider collapsed />
    </StoryContainer>
  ),
};

export const CustomSize = {
  render: () => (
    <StoryContainer vertical stretch>
      <Divider lineWidth="60%" notchWidth="60px" notchHeight="6px" />
    </StoryContainer>
  ),
};
