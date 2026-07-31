import { Icon, icons } from 'components/Icon';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
};

export const Icons = {
  render: () => (
    <StoryContainer>
      {Object.keys(icons).map(key => (
        <Icon key={key} icon={key} />
      ))}
    </StoryContainer>
  ),
};
