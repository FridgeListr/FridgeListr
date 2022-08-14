const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "bundle"),
  },
  performance: {
    hints: false
  },
  mode: process.env.NODE_ENV,
  resolve: {
    modules: [__dirname, "client", "node_modules"],
    extensions: ["*", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      //   we may not need the stuff before
      // {
      //   test: /\.png|svg|jpg|gif$/,
      //   use: ["file-loader"],
      // },
    ],
  },
  plugins: [
    // must always create a new instance
    new HtmlWebpackPlugin({
      title: 'Development',
      // must set the template for the page to render
      // check approach on this
      template: './index.html',
      filename: 'bundle.html'
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    static: [
      {
        directory: path.resolve(__dirname, './'),
        publicPath: '/',
      },
      {
        directory: path.resolve(__dirname, 'bundle'),
        publicPath: '/',
      }
    ],
    hot: true, //nice
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    }
  },
}