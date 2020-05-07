process.env.SERVER_PORT = 5000;
process.env.NODE_ENV = 'test';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: ['node_modules/', 'src/spec/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
