module.exports = {
  preset: 'ts-jest',
  rootDir: 'src',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)']
}
