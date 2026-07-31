import { Link } from 'components/Link';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Link',
  component: Link,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <StoryContainer style={{ fontSize: 18 }}>
      <Link href="https://parammehta.com">Primary link</Link>
      <Link secondary href="https://parammehta.com">
        Secondary link
      </Link>
    </StoryContainer>
  ),
};

export const InternalLink = {
  render: () => (
    <StoryContainer style={{ fontSize: 18 }}>
      <Link href="/#skills">Internal link (RouterLink)</Link>
      <Link secondary href="/#skills">
        Secondary internal link
      </Link>
    </StoryContainer>
  ),
};
