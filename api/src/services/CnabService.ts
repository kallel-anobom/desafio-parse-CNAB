import CnabParser from "../utils/CnabParser";
import CnabRepository from "../repositories/CnabRepository";
import { ITransaction, ITransactionInput } from "../models/Transaction";

export default class CnabService {
  private repository: CnabRepository;

  constructor() {
    this.repository = new CnabRepository();
  }

  async processFile(file: string): Promise<ITransactionInput[]> {
    const lines = file.split("\n");
    const transactions: ITransactionInput[] = lines.map((line) =>
      CnabParser.parse(line)
    );
    for (const transaction of transactions) {
      await this.repository.create(transaction);
    }
    return transactions;
  }

  async getAllTransactions(): Promise<ITransaction[]> {
    return this.repository.getAll();
  }
}
