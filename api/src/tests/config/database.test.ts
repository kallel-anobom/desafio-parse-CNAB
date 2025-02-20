import { DataSource, DataSourceOptions } from "typeorm";
import { connectDB, disconnectDB, dataSource } from "../../config/database";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

describe("Database Connection (PostgreSQL)", () => {
  beforeAll(async () => {
    const testDataSourceOptions: DataSourceOptions = {
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432", 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/../../src/models/*.ts"],
      synchronize: true,
      logging: false,
    };

    Object.assign(dataSource, new DataSource(testDataSourceOptions));

    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should connect to the PostgreSQL database successfully", async () => {
    expect(dataSource.isInitialized).toBe(true);
  });

  it("should disconnect from the PostgreSQL database successfully", async () => {
    await disconnectDB();
    expect(dataSource.isInitialized).toBe(false);
  });
});
