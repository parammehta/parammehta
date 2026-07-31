import { Input } from 'components/Input';
import { useFormInput } from 'hooks';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
};

const Story = args => {
  const exampleValue = useFormInput('');
  return (
    <StoryContainer>
      <div style={{ maxWidth: 400, width: '100%' }}>
        <Input {...exampleValue} {...args} />
      </div>
    </StoryContainer>
  );
};

export const Text = {
  args: { label: 'Your name', type: 'text' },
  render: Story,
};

export const Multiline = {
  args: { label: 'Type a message', type: 'text', multiline: true },
  render: Story,
};
