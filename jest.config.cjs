module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/.internal/**'
  ],
  // We don't need Babel transforms; this keeps it simple
  transform: {}
};
