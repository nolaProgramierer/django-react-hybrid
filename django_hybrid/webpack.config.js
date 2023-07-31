const path = require('path');

module.exports = {
    entry: './piano/assets/piano/index.js', // path to input file
    output: {
        // output bundle file name
        filename: 'index-bundle.js', 
        // path to Django static directory
        path: path.resolve(__dirname, './piano/static/piano')  
    }
}