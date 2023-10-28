const express = require('express')
const dotenv = require ('dotenv')
const useMiddleware = require('./middleware');
const router = require('./routes');
const functions = require('firebase-functions')
const tokenCookieMiddleware = require('./middleware/tokenCookieMiddleware')

const app = express()
dotenv.config()

useMiddleware(app)

app.use(router)
app.use(tokenCookieMiddleware)

const server_port = (process.env.SERVER_PORT) 

app.listen(server_port, () => {
 console.log(`Running on port http://localhost:${server_port}`);
})

exports.project_milestone_mnajmytsss = functions.https.onRequest(app)