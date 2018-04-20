import path from 'path';
/*
 Export react-winjs as a library object (a ReactWinJS var).
 */
module.exports = {
  entry: './library.jsx',
  output: {
    filename: 'dist/browser-bundle.js',
    library: 'ReactWinJS',
    libraryTarget: 'var'
  },
  module: {
    loaders: [
      {test: /\.jsx/, loader: 'jsx-loader'}
    ]
  },
  externals: {
    'react': 'React',
    'react/addons': 'React'
  }
};
