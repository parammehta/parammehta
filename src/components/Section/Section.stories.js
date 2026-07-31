import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Section',
  component: Section,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <StoryContainer vertical stretch>
      <Section>
        <Heading level={2}>Section heading</Heading>
        <Text>This content lives inside a Section layout primitive.</Text>
      </Section>
    </StoryContainer>
  ),
};

export const AsArticle = {
  render: () => (
    <StoryContainer vertical stretch>
      <Section as="article">
        <Heading level={2}>Article section</Heading>
        <Text>Rendered as an &lt;article&gt; element via the as prop.</Text>
      </Section>
    </StoryContainer>
  ),
};
