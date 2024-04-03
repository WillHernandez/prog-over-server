import express from "express"
import dotenv from 'dotenv'
import { router as excerciseR } from './routes/excerciseR.js'
import morgan from "morgan"
import cors from 'cors'
const port = process.env.PORT || 4000
const app = express()
dotenv.config()

const whitelist = [process.env.FRONTEND, 'http://localhost:3000']
const corsOptions = {
	origin: (origin, callback) => {
		if(whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200
}

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors(corsOptions));

app.use("/api/excercises", excerciseR)
// app.use("/api/workout", workoutR)
// app.use("/api/user", userR)

app.listen(port, () => {
	console.log(`Connected on http://localhost:${port}`);
})