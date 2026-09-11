import express from "express";
import cors from "cors";
import path from "path";
import { Pool } from "pg";
import "dotenv/config";


const db = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    // port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})


const app = express();

// get, post, put, patch, delete

const PORT = 5000;

// let products = [] //state

app.use(express.json());
app.use(cors())

app.get('/students', async (req, res) => {
    try {
        const students = await db.query('SELECT * FROM students;');
        res.status(200).send({ status: "success", students: students.rows })
    } catch (error) {
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
    // res.send({ message: "Hello World" })
})

app.post('/student', (req, res) => {
    // req.body
    const reqBody = req.body
})

const __dirname = path.resolve();
const __frontend = path.join(__dirname, './web/build')
app.use('/', express.static(__frontend))
app.use("/*splat", express.static(__frontend))

app.listen(PORT, () => {
    console.log(`App is Running on PORT ${PORT}`)
})