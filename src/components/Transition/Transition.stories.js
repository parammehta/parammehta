import { useState } from 'react';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Transition',
  component: Transition,
  tags: ['autodocs'],
};

const TransitionDemo = ({ timeout }) => {
  const [visible, setVisible] = useState(true);
  return (
    <StoryContainer vertical>
      <Button onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
      <Transition in={visible} timeout={timeout} unmount>
        {status => (
          <Text
            style={{
              opacity: status ? 1 : 0,
              transition: `opacity ${timeout}ms ease`,
            }}
          >
            I fade in and out. Status: {status ? 'visible' : 'hidden'}
          </Text>
        )}
      </Transition>
    </StoryContainer>
  );
};

export const Default = {
  render: () => <TransitionDemo timeout={300} />,
};

export const SlowTimeout = {
  render: () => <TransitionDemo timeout={800} />,
};
