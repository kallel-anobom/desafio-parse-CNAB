import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/../models/*.ts"],
  synchronize: true,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export const connectDB = async (): Promise<void> => {
  try {
    await dataSource.initialize();
    console.log("Database connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database connection error:", error);
    } else {
      console.error("An unknown error occurred:", error);
    }
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (dataSource.isInitialized) {
    await dataSource.destroy();
    console.log("Database disconnected");
  }
};

export { dataSource };
