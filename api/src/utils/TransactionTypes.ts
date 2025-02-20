export interface TransactionType {
  description: string;
  nature: "Entrada" | "Saída";
  signal: "+" | "-";
}

export const transactionTypes: { [key: number]: TransactionType } = {
  1: { description: "Débito", nature: "Entrada", signal: "+" },
  2: { description: "Boleto", nature: "Saída", signal: "-" },
  3: { description: "Financiamento", nature: "Saída", signal: "-" },
  4: { description: "Crédito", nature: "Entrada", signal: "+" },
  5: { description: "Recebimento Empréstimo", nature: "Entrada", signal: "+" },
  6: { description: "Vendas", nature: "Entrada", signal: "+" },
  7: { description: "Recebimento TED", nature: "Entrada", signal: "+" },
  8: { description: "Recebimento DOC", nature: "Entrada", signal: "+" },
  9: { description: "Aluguel", nature: "Saída", signal: "-" },
};

export function getTransactionType(type: number): TransactionType {
  if (!transactionTypes[type]) {
    throw new Error(`Invalid transaction type: ${type}`);
  }
  return transactionTypes[type];
}
