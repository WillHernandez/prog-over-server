import express from "express";
import dotenv from 'dotenv';
import { router as excerciseR } from './routes/excerciseR.js';
import { router as userR } from './routes/userR.js';
import session from "express-session";
import cors from "cors";
const port = 4000;
const app = express();
dotenv.config();
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(session({
    secret: 'secretkeyforthissession',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 3600000 }
}));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/user", userR);
app.use("/api/excercises", excerciseR);
// app.use("/api/workout", workoutR)
app.listen(port, () => {
    console.log(`Connected on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map