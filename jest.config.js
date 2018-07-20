module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': { 'tsConfigFile': 'tsconfig.json' },
  },
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: { '^.+\\.ts$': 'ts-jest' },
};
