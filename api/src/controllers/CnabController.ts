import { Request, Response } from "express";
import CnabService from "../services/CnabService";

export default class CnabController {
  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: "Arquivo não encontrado." });
        return;
      }

      const fileContent = req.file?.buffer.toString() || "";
      const transaction = await new CnabService().processFile(fileContent);
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTransactions(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await new CnabService().getAllTransactions();
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
