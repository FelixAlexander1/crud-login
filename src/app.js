import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'


const app = express();

// Permite múltiples orígenes
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Permite enviar cookies
}));

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use("/api",authRoutes);

app.use("/api",taskRoutes);



export default app;