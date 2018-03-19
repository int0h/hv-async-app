var path = require('path');

module.exports = {
    entry: './src/app.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: "pre"
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: './app.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map'
};
