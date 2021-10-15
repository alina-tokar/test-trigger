const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: "node",
  mode: "production",
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, "bundle"),
    library: 'handler',
    libraryTarget: 'umd',
    filename: "lambda.js"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.d\.ts$/,
        use: 'ignore-loader'
      },
    ]
  },
  node: {
    fs: "empty" // avoids error messages
}
};
