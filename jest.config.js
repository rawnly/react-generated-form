module.exports = {
  roots: ['<rootDir>/__tests__'],
  setupFiles: [
    "<rootDir>/enzyme-setup.js"
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  reporters: [
    "default",
    "jest-teamcity"
  ]
}
