import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  description: string;
  amount: number;
};
const TransactionsTable = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  return <h1>TransactionsTable</h1>;
};

export default TransactionsTable;
