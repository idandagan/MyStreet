import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.babel';

const CLIENT_DEV_PORT = process.env.PORT || 8000;

function startServerCallback(err, result) {
    if (err) console.error(err);
    console.log(`Listening at http://localhost:${CLIENT_DEV_PORT}/`);
}

new WebpackDevServer(webpack(config), { historyApiFallback: true }).listen(CLIENT_DEV_PORT, startServerCallback);
