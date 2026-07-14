const path = require('path');
const { TwilightWatcherPlugin } = require('@salla.sa/twilight');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    home: './src/assets/scripts/home.js',
    app: './src/assets/scripts/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new TwilightWatcherPlugin()
  ],
  devtool: 'source-map'
};
