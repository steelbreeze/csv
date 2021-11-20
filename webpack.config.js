const path = require('path');

module.exports = {
  entry: './lib/node/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib/web'),
    filename: 'csv.min.js',
    library: 'csv'
  }
};