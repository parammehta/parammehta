import { Monogram } from 'components/Monogram';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Monogram',
  component: Monogram,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <StoryContainer>
      <Monogram highlight />
    </StoryContainer>
  ),
};

export const NoHighlight = {
  render: () => (
    <StoryContainer>
      <Monogram />
    </StoryContainer>
  ),
};
