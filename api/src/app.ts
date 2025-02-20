import express from "express";
import cnabRoutes from "./routes/cnabRoutes";

import { connectDB, disconnectDB } from "./config/database";

const app = express();

async function startServer() {
  try {
    await connectDB();
    console.log("Database connected");

    app.use(express.json());
    app.use("/api", cnabRoutes);

    app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.error(err.stack);
        res.status(500).json({ error: err.message });
      }
    );

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      process.exit(1);
    });

    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
