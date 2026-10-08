import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import companyRoutes from './routes/company.routes';
import applicationRoutes from './routes/application.routes';
import noteRoutes from "./routes/note.routes";
import savedJobRoutes from "./routes/saved-job.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Joblyst API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api", noteRoutes);
app.use("/api/saved-jobs", savedJobRoutes);

export default app;