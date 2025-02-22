import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CNAB Parser API",
      version: "1.0.0",
      description: "API para processar arquivos CNAB e gerenciar transações",
    },
    servers: [
      {
        url: process.env.URL_API || "http://localhost:3001/api",
        description: "Local server",
      },
    ],
  },
  apis: ["../routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
