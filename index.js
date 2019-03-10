require('dotenv').config()

const
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    routes = require('./routes')

require('./config/passport')(passport)

const
    app = express();

app
    .use(bodyParser.json())
    .use(passport.initialize())
    .use(cors())
    .use(bodyParser.urlencoded({extended: false}))
    .use('/api', routes)
    .listen(process.env.PORT, () => console.log(`Online at Port ${process.env.PORT}`));

mongoose
    .connect(process.env.MONGO_DB, {useNewUrlParser: true})
    .then(() => console.log(`MongoDB Connected`))
    .catch((err) => console.log(err));