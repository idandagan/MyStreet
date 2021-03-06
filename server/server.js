import express from 'express';
import bodyParser from 'body-parser';
import log from 'morgan';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import expressValidator from 'express-validator';
import routes from './routes/';

const MongoStore = connectMongo(session);
const SERVER_DEV_PORT = 8001;
const port = process.env.PORT || SERVER_DEV_PORT;
const app = express();
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

mongoose.connect('mongodb://emma:Aa123123@ds127949.mlab.com:27949/mystreetdb');
/*if (env === 'development') {
    mongoose.connect('mongodb://localhost/mystreet');
} else {
    mongoose.connect('mongodb://heroku_35lzfcnx:Aa123123@ds163711.mlab.com:63711/heroku_35lzfcnx');
}*/

app.use(session({
    secret: 'keyboard cat',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
    },
}));

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(log('dev'));
app.use(routes);

const server = app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

/*./mongod --bind_ip localhost*/
