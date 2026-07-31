import { Footer } from 'components/Footer';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Footer',
  component: Footer,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <StoryContainer stretch vertical>
      <Footer />
    </StoryContainer>
  ),
};
