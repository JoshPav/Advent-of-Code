module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript'
    }
  },
  testMatch: ['<rootDir>/**/*.spec.ts']
}
