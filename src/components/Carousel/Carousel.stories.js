import img1 from 'assets/gamestack-list.jpg';
import img1Large from 'assets/gamestack-list-large.jpg';
import img1Placeholder from 'assets/gamestack-list-placeholder.jpg';
import img2 from 'assets/gamestack-login.jpg';
import img2Large from 'assets/gamestack-login-large.jpg';
import img3 from 'assets/rivian-fleet-os-1.png';
import { Carousel } from 'components/Carousel';
import { StoryContainer } from '../../../.storybook/StoryContainer';

export default {
  title: 'Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export const Images = {
  render: () => (
    <StoryContainer>
      <Carousel
        style={{ maxWidth: 800, width: '100%' }}
        placeholder={img1Placeholder}
        images={[
          { src: img1, srcSet: [img1, img1Large], alt: 'GameStack game list' },
          { src: img2, srcSet: [img2, img2Large], alt: 'GameStack login screen' },
          { src: img3, srcSet: [img3], alt: 'Rivian Fleet OS interface' },
        ]}
        width={1920}
        height={1080}
      />
    </StoryContainer>
  ),
};
