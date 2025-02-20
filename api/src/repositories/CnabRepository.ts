import { dataSource } from "../config/database";
import {
  Transaction,
  ITransactionInput,
  ITransaction,
} from "../models/Transaction";
import { getTransactionType } from "../utils/TransactionTypes";

export default class CnabRepository {
  async create(transaction: ITransactionInput): Promise<Transaction> {
    const transactionRepository = dataSource.getRepository(Transaction);

    const { nature, signal, ...dataToSave } = transaction;

    const newTransaction = transactionRepository.create(dataToSave);

    return await transactionRepository.save(newTransaction);
  }
  async getAll(): Promise<ITransaction[]> {
    const transactionRepository = dataSource.getRepository(Transaction);
    const transactions = await transactionRepository.find();

    return transactions.map((transaction) => {
      const { nature, signal } = getTransactionType(transaction.type);
      return {
        ...transaction,
        nature,
        signal,
      };
    });
  }
}
