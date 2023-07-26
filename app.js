import express from "express";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({ path: "./data/config.env" });


// Using Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Using routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/task", taskRoute);


app.get('/', (req, res) => {
    res.send("Nice Working");
});

app.use(errorMiddleware);