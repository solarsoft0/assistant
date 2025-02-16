const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  return {
    mode: argv.mode === "production" ? "production" : "development",
    stats: { warnings: false },
    // https://github.com/webpack-contrib/css-loader/issues/447#issuecomment-285598881
    node: {
      fs: "empty",
    },
    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === "production" ? false : "inline-source-map",

    entry: {
      ui: "./src/ui.tsx", // The entry point for your UI code
      code: "./src/code.ts", // The entry point for your plugin code
    },

    module: {
      rules: [
        // Converts TypeScript code to JavaScript
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile:
                  argv.mode === "production"
                    ? "tsconfig.prod.json"
                    : "tsconfig.json",
              },
            },
          ],
          exclude: /node_modules/,
        },

        // Enables including CSS by doing "import './file.css'" in your TypeScript code
        {
          test: /\.css$/,
          loader: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },

        // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
        {
          test: /\.(png|jpg|gif|webp|svg|zip)$/,
          loader: [{ loader: "url-loader" }],
        },
      ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"] },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"), // Compile into a folder called "dist"
    },

    // minimize
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: { comments: false },
            // required for @flutter-builder annotion based code gen.
            keep_classnames: true,
          },
        }),
      ],
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
      new webpack.EnvironmentPlugin({
        HOST: get_host(argv.host),
      }),
      // https://www.figma.com/plugin-docs/bundling-webpack/
      new HtmlWebpackPlugin({
        template: "./src/ui.html",
        filename: "ui.html",
        inlineSource: ".(js)$",
        chunks: ["ui"],
      }),
      // https://github.com/jantimon/html-webpack-plugin/issues/1379#issuecomment-610208969
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.(js|css)$/]),
    ],
  };
};

const get_host = (mode) => {
  switch (mode) {
    case "development":
      return "http://localhost:3303";
    case "production":
      return "https://assistant-serve.grida.co";
    case "staging":
      return "https://staging-branch-assistant-serve.vercel.app";
    default:
      return "http://localhost:3303";
  }
};
