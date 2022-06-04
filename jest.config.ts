/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: [
    "jest-canvas-mock"
  ],
  setupFilesAfterEnv: ['<rootDir>/test.setup.ts'],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/fileMock.js",
    "\\.(css|less)$": "<rootDir>/test/fileMock.js",
  },
  transform: {"^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"},
  transformIgnorePatterns: ["/node_modules"],
  resolver: undefined
};
