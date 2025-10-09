import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import authRoutes from "./routes/auth.routes.js";
import notFound from "./middlewares/notFound.js";

// Express
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use(notFound);

export default app;
