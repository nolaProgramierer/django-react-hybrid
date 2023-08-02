const path = require('path');

module.exports = {
    // path to input file
    entry: './piano/assets/piano/index.js', 
    output: {
        // output bundle file name
        filename: 'index-bundle.js', 
        // path to Django static directory
        path: path.resolve(__dirname, './piano/static/piano')  
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
          },
        ]
      }
}