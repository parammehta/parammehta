const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Load next.config.js and .env files in the test environment
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // Mirror the jsconfig `baseUrl: src` so imports like `utils/date` resolve
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    // next/jest maps images and stylesheets but leaves these to be parsed as JS
    '\\.(woff|woff2|eot|ttf|otf|mp4|hdr|glb|glsl)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

// next/jest maps `.svg` to a string stub, but webpack runs SVGR so `.svg`
// imports are React components. moduleNameMapper is first-match-wins and
// next/jest inserts its own rule ahead of ours, so drop it and lead with ours.
module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();
  const inherited = { ...config.moduleNameMapper };
  delete inherited['^.+\\.(svg)$'];

  config.moduleNameMapper = {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    ...inherited,
  };

  return config;
};
