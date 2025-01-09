import express from "express"
import dotenv from "dotenv"

import {connectDB} from './config/db.js'
import auth from './routes/auth.routes.js'
import task from './routes/task.routes.js'
import user from './routes/user.routes.js'

dotenv.config()
const app = express()

app.use(express.json());

//mongodb connection
connectDB()

//routes
app.use('/api/auth', auth)
app.use('/api/tasks', task)
app.use('/api/user', user)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})