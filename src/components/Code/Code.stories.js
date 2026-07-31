import { Code } from 'components/Code';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Code',
  component: Code,
  tags: ['autodocs'],
};

export const JavaScript = {
  render: () => (
    <StoryContainer>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <Code className="language-js">
          {`const greet = name => \`Hello, \${name}!\`;
console.log(greet('world'));`}
        </Code>
      </div>
    </StoryContainer>
  ),
};

export const PlainText = {
  render: () => (
    <StoryContainer>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <Code>npm install three</Code>
      </div>
    </StoryContainer>
  ),
};
