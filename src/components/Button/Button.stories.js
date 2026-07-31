import { useState } from 'react';
import { action } from 'storybook/actions';
import { Button } from 'components/Button';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

const LoadableButton = props => {
  const [loading, setLoading] = useState(false);
  return <Button loading={loading} onClick={() => setLoading(!loading)} {...props} />;
};

export const Primary = {
  render: () => (
    <StoryContainer>
      <Button onClick={action('clicked')}>Text only</Button>
      <Button icon="send" onClick={action('clicked')}>
        Icon left
      </Button>
      <Button iconEnd="arrowRight" onClick={action('clicked')}>
        Icon right
      </Button>
    </StoryContainer>
  ),
};

export const Secondary = {
  render: () => (
    <StoryContainer>
      <Button secondary onClick={action('clicked')}>
        Text only
      </Button>
      <Button secondary icon="arrowRight" onClick={action('clicked')}>
        Icon left
      </Button>
      <Button secondary iconEnd="arrowRight" onClick={action('clicked')}>
        Icon right
      </Button>
    </StoryContainer>
  ),
};

export const IconOnly = {
  render: () => (
    <StoryContainer gutter={20}>
      <Button iconOnly aria-label="Send" icon="send" onClick={action('clicked')} />
      <Button iconOnly aria-label="Figma" icon="figma" onClick={action('clicked')} />
      <Button iconOnly aria-label="Close" icon="close" onClick={action('clicked')} />
    </StoryContainer>
  ),
};

export const Loader = {
  render: () => (
    <StoryContainer>
      <LoadableButton>Click to load</LoadableButton>
      <LoadableButton icon="send">Click to load</LoadableButton>
    </StoryContainer>
  ),
};

export const WithInternalLink = {
  render: () => (
    <StoryContainer>
      <Button href="/#skills">Internal link (RouterLink)</Button>
      <Button href="/#skills" secondary>
        Secondary internal link
      </Button>
    </StoryContainer>
  ),
};
