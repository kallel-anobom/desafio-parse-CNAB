import CnabParser from "../utils/CnabParser";
import CnabRepository from "../repositories/CnabRepository";
import { ITransaction, ITransactionInput } from "../models/Transaction";

export default class CnabService {
  private repository: CnabRepository;

  constructor() {
    this.repository = new CnabRepository();
  }

  async processFile(file: string): Promise<ITransactionInput[]> {
    if (!file || file.trim() === "") {
      throw new Error("File content is empty");
    }

    const lines = file.split("\n").filter((line) => line.trim() !== "");
    const transactions: ITransactionInput[] = [];

    for (const line of lines) {
      try {
        const transaction = CnabParser.parse(line);
        transactions.push(transaction);
        await this.repository.create(transaction);
      } catch (error) {
        console.error(`Error parsing line: ${line}`, error);
        throw new Error(`Failed to process line: ${line}. Error: ${error}`);
      }
    }

    return transactions;
  }

  async getAllTransactions(): Promise<ITransaction[]> {
    return this.repository.getAll();
  }
}
