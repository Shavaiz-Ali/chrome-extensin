import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

// Get the directory name equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  // Ensure env is passed correctly
  if (!env) {
    env = { target: "web" }; // default to web if not specified
  }

  const isExtension = env.target === "extension";

  return {
    mode: isExtension ? "production" : "development",

    // Entry points with explicit file extensions
    entry: isExtension
      ? {
          popup: "./src/extension/popup.jsx",
          background: "./src/extension/background/background.js",
          content: "./src/extension/content-scripts/content.js",
        }
      : "./src/web/main.jsx",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isExtension ? "[name].bundle.js" : "bundle.js",
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },

    resolve: {
      extensions: [".js", ".jsx", ".mjs", ".css"],
      // alias: {
      //   "@": path.resolve(__dirname, "src"),
      //   "@web": path.resolve(__dirname, "src/web"),
      // },
    },

    plugins: [
      ...(isExtension
        ? []
        : [
            new HtmlWebpackPlugin({
              template: "./src/web/index.html",
            }),
          ]),
    ],

    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"),
      },
      compress: true,
      port: 8080,
      open: true,
      hot: true,
    },
  };
};
