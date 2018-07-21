module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  globals: { 'ts-jest': { tsConfigFile: 'tsconfig.json' } },
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: { '^.+\\.ts$': 'ts-jest' },
};
