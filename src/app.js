import express from "express";
import morgan from "morgan";
import cors from "cors";
// import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import authRoutes from "./routes/auth.routes.js";
import notFound from "./middlewares/notFound.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());

// API
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta principal -> home.html (no hay index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/home.html"));
});

app.use(notFound);

export default app;