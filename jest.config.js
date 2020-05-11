process.env.SERVER_PORT = 5000;
process.env.NODE_ENV = 'test';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      functions: 80,
    },
  },
  coveragePathIgnorePatterns: [
    'node_modules/',
    'src/spec/',
    'src/server.ts',
    'src/clients',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
