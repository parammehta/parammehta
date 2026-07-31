import { Loader } from 'components/Loader';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Loader',
  component: Loader,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <StoryContainer>
      <Loader size={48} />
    </StoryContainer>
  ),
};
