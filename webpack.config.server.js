import path from 'path';

module.exports = {

    entry: path.resolve(__dirname, 'server/server.js'),

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'server.bundle.js',
        publicPath: '/',
    },

    target: 'node',

    node: {
        __filename: true,
        __dirname: true,
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        modules: [
            'client',
            'node_modules',
        ],
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react',
                        'es2015',
                        'stage-0',
                    ],
                    plugins: [
                        [
                            'babel-plugin-webpack-loaders', {
                                config: './webpack.config.prod.js',
                                verbose: false,
                            },
                        ],
                    ],
                },
            }, {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
};