import request from "supertest";
import express, { Request, Response } from "express";
import multer from "multer";

import CnabController from "../../controllers/CnabController";
import CnabService from "../../services/CnabService";

jest.mock("../../services/CnabService");

const app = express();
app.use(express.json());

const upload = multer();

const cnabController = new CnabController();
app.post("/api/upload", upload.single("file"), (req: Request, res: Response) =>
  cnabController.uploadFile(req, res)
);

app.get("/api/transactions", (req: Request, res: Response) =>
  cnabController.getAllTransactions(req, res)
);

describe("CnabController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should upload the CNAB file and return status 200", async () => {
    const mockFileContent =
      "3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO";
    const mockTransactions = {
      id: 1,
      type: "venda",
      value: 142,
      cpf: "09620676017",
      card: "4753****3153",
      date: "2019-03-01T00:00:00.000Z",
      time: "15:34:53",
      store_owner: "JOÃO MACEDO",
      store_name: "BAR DO JOÃO",
    };

    (CnabService as jest.Mock).mockImplementation(() => ({
      processFile: jest.fn().mockResolvedValue(mockTransactions),
    }));

    const response = await request(app)
      .post("/api/upload")
      .set("Content-Type", "multipart/form-data")
      .attach("file", Buffer.from(mockFileContent), "file.txt");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTransactions);
  });

  it("should return status 400 if no file is provided", async () => {
    const response = await request(app).post("/api/upload");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Arquivo não encontrado." });
  });

  it("should return status 500 if an error occurs during file processing", async () => {
    (CnabService as jest.Mock).mockImplementation(() => ({
      processFile: jest.fn().mockRejectedValue(new Error("Test error")),
    }));

    const response = await request(app)
      .post("/api/upload")
      .attach("file", Buffer.from(""), "cnab.txt");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Test error" });
  });

  it("should return all transactions", async () => {
    const mockTransactions = [
      {
        id: 1,
        type: "venda",
        value: 142,
        cpf: "09620676017",
        card: "4753****3153",
        date: "2019-03-01T00:00:00.000Z",
        time: "15:34:53",
        store_owner: "JOÃO MACEDO",
        store_name: "BAR DO JOÃO",
      },
    ];
    (CnabService as jest.Mock).mockImplementation(() => ({
      getAllTransactions: jest.fn().mockResolvedValue(mockTransactions),
    }));
    const response = await request(app).get("/api/transactions");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTransactions);
  });

  it("should return status 500 if an error occurs during transaction retrieval", async () => {
    (CnabService as jest.Mock).mockImplementation(() => ({
      getAllTransactions: jest.fn().mockRejectedValue(new Error("Test error")),
    }));
    const response = await request(app).get("/api/transactions");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Test error" });
  });
});
