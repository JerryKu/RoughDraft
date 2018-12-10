/** require dependencies */
const express = require('express')
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path');
const proxy = require('http-proxy-middleware');
var privateKey  = fs.readFileSync(path.join(__dirname, '../server/sslcert') + '/localhost-key.pem', 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, '../server/sslcert') + '/localhost.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium"

let cloud_name;
let api_key;
let api_secret;

if(process.env.stage !== 'production' && process.env.stage !== 'staging'){
  let config = require('../config.js')
  cloud_name = config.cloudinaryAuth.Name;
  api_key = config.cloudinaryAuth.APIKEY;
  api_secret = config.cloudinaryAuth.APISECRET;
}else{
  cloud_name = process.env.cloudinaryAuthName;
  api_key = process.env.cloudinaryAuthAPIKEY;
  api_secret = process.env.cloudinaryAPISECRET;
}

/** configure cloudinary */
cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        //useMongoClient: true
    })
} catch (error) {

}

let httpsPort = 5000 || process.env.PORT
/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors({
  'allowedHeaders': ['Origin','X-Auth-Token','Content-Type', 'Authorization'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  'preflightContinue': false,
  'credentials': true
}));

app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

app.use(proxy('/api', { target: 'https://localhost:5000/' , secure: false, changeOrigin: true}));

var httpsServer = https.createServer(credentials, app);
/** start server */
httpsServer.listen(httpsPort, () => {
    console.log(`Https Server started at port: ${httpsPort}`);
});
