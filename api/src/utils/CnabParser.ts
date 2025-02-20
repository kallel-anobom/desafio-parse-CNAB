import { transactionTypes } from "./TransactionTypes";
import { ITransactionInput } from "../models/Transaction";

export default class CnabParser {
  static parse(line: string): ITransactionInput {
    const type = parseInt(line.substring(0, 1), 10);
    if (!transactionTypes[type]) {
      throw new Error(`Invalid transaction type: ${type}`);
    }

    const date = new Date(
      parseInt(line.substring(1, 5)),
      parseInt(line.substring(5, 7)) - 1,
      parseInt(line.substring(7, 9))
    );

    const amount = parseFloat(line.substring(9, 19)) / 100;
    const cpf = line.substring(19, 30);
    const card = line.substring(30, 42);
    const time = line.substring(42, 48);
    const storeOwner = line.substring(48, 62).trim();
    const storeName = line.substring(62, 81).trim();

    const { nature, signal } = transactionTypes[type] as {
      nature: "Entrada" | "Saída";
      signal: "+" | "-";
    };

    return {
      type,
      date,
      amount,
      cpf,
      card,
      time,
      storeOwner,
      storeName,
      nature,
      signal,
    };
  }
}
