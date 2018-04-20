var path = require('path');

module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx/, loader: 'jsx-loader'}
    ]
  },
  resolve: {
    alias: {
      'react-winjs': path.resolve(__dirname, '../../react-winjs')
    },
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};
