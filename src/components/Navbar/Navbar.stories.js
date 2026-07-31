import { Navbar } from 'components/Navbar';
import { AppContext } from 'pages/_app.page';

const appContext = { menuOpen: false, dispatch: () => {} };

export default {
  title: 'Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: false,
      router: { pathname: '/', asPath: '/' },
    },
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <AppContext.Provider value={appContext}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

export const Default = {};

export const MenuOpen = {
  parameters: {
    nextjs: {
      appDirectory: false,
      router: { pathname: '/', asPath: '/' },
    },
  },
  decorators: [
    Story => (
      <AppContext.Provider value={{ menuOpen: true, dispatch: () => {} }}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

export const ArticlesPage = {
  parameters: {
    nextjs: {
      appDirectory: false,
      router: { pathname: '/articles', asPath: '/articles' },
    },
  },
};
