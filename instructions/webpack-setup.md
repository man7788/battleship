## Initialize npm, install webpack locally,
## and install the webpack-cli (the tool used to run webpack on the command line)
- npm init -y
- npm install webpack webpack-cli --save-dev


## Add a .gitignore file to your project
- node_modules


## Create a src and dist directory with the following contents
- an index.js file in src
- an index.html file in dist
- Link the bundle.js file in a script tag


## Adjust package.json as private,
## Rmove the main entry to prevent an accidental publish of your code.
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.2"
  }
}


## Create a webpack.config.js file
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(\_\_dirname, 'dist'),
  },
};


## Generate an optimized bundle
- npx webpack --config webpack.config.js


## Adjust package.json by adding an npm script shortcut
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.4.0",
    "webpack-cli": "^4.2.0"
  },
  "dependencies": {
    "lodash": "^4.17.20"
  }
}

## Npm run build command can be used in place of the npx webpack
- npm run build


## Install style-loader and css-loader
- npm install --save-dev style-loader css-loader


## Add style-loader and css-loader to your webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(\_\_dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

## Add the built-in images Asset Modules to your webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(\_\_dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

## Add the built-in font Asset Modules to your webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(\_\_dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

## Install HtmlWebpackPlugin
- npm install --save-dev html-webpack-plugin


## Adjust the webpack.config.js file for HtmlWebpackPlugin
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'New Title',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(\_\_dirname, 'dist'),
  },
};

## Adjust the webpack.config.js file for Cleaning up the /dist folder
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(\_\_dirname, 'dist'),
    clean: true,
  },
};

## Setting mode to 'development'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(\_\_dirname, 'dist'),
    clean: true,
  },
};


## Adjust the webpack.config.js file for inline-source-map option
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(\_\_dirname, 'dist'),
    clean: true,
  },
};


## Adjust package.json for using watch mode
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "webpack --watch",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^5.4.0",
    "webpack-cli": "^4.2.0"
  },
  "dependencies": {
    "lodash": "^4.17.20"
  }
}

## Make sure git knows about your subtree (the subfolder with your site).
- git add dist && git commit -m "Initial dist subtree commit"


## Use subtree push to send it to the gh-pages branch on GitHub.
- git subtree push --prefix dist origin gh-pages
- If your folder isn’t called dist, then you’ll need to change that in each of the commands above.
