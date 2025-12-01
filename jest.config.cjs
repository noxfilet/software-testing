module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,

  collectCoverageFrom: [
        'src/add.js',
        'src/capitalize.js',  
        'src/countBy.js',  
        'src/drop.js', 
        'src/eq.js', 
        'src/filter.js',      
        'src/get.js',
        'src/isEmpty.js',
        'src/keys.js',  
        'src/words.js',
    ],

  projects: [
    {
      displayName: "manual",
      testMatch: ['**/tests/self-designed/**/*.test.js']
    },
    {
      displayName: "ai",
      testMatch: ['**/tests/AI-assisted/**/*.test.js']
    }
  ],

  // We don't need Babel transforms; this keeps it simple
  transform: {}
};
