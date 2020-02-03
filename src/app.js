import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import ApiRoutes from './routes/api/index'
import AdminRoutes from './routes/admin/index'
import exphbs from 'express-handlebars'
import cors from 'cors';
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

/**
 * MongoDb connection
 */
const url = "mongodb://localhost:27017/businessDirectory";
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(url,{useNewUrlParser: true})
    .then(() => console.log("MongoDb Connected..."))
    .catch(err => console.log(err));


/**
 * Express body parser
  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.json());
app.use(cors());
app.options('*', cors());

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/**
 * Routes
 */
ApiRoutes(app);
AdminRoutes(app);

/** swagger integrate
 *
 * @type {string | number}
 */
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:7000',
        basePath: '/api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

//defining port and starting server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log("Server started at "+ PORT));

export default app;
