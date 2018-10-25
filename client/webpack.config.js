module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    {test: /\.css$/, loader: 'style!css'},
    {test: /\.(otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=8192'},
    {
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
