process.env.NODE_ENV = 'test';

const { defaults: tsjPreset } = require('ts-jest/presets');
module.exports = {
  preset: '@shelf/jest-mongodb',
  transform: tsjPreset.transform,
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
