import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

export default app;
