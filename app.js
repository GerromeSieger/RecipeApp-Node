import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import redis from 'redis';
import userRouter from './router/userRouter.js';
import recipeRouter from './router/recipeRouter.js';
import connect from './database/conn.js';
import swaggerDocs from "./swagger.js";
import client from "prom-client";

dotenv.config()
const app = express();

/** middlewares */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = process.env.PORT || 5000;


/* export const client = redis.createClient({
    url: process.env.REDIS_URL
});

// on the connection
client.on("connect", () => console.log("Connected to Redis")); 

await client.connect();
*/

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api/users', userRouter)
app.use('/api/recipe', recipeRouter)

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(client.register.metrics()) 
})

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
        // Swagger Page
        swaggerDocs(app, port)
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})


export default app
