## Install Babel
- npm install -D babel-loader @babel/core @babel/preset-env webpack

## Within your webpack configuration object, you'll need to add the babel-loader to the list of modules
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
    }
  ]
}

## .browserlistrc which is part of a standard that defines what browsers your app supports. 
## If you don’t use Google Analytics then a good default can be to support all browsers with a market share of 0.25% or higher like this: 
- >0.25%