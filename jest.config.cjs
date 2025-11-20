module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/**/*.js',
  //   '!src/**/.internal/**'
  // ],

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

  // We don't need Babel transforms; this keeps it simple
  transform: {}
};
