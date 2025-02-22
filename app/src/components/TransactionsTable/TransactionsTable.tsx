import { useEffect } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { formatCurrency } from "../../utils/formatCurrency";
import "./index.css";

type Transaction = {
  id: number;
  type: number;
  date: string;
  amount: number;
  cpf: string;
  card: string;
  time: string;
  storeOwner: string;
  storeName: string;
  description: string;
};
const TransactionsTable = () => {
  const {
    data,
    loading,
    error,
    fetchData,
  }: {
    data: Transaction[] | null;
    loading: boolean;
    error: string | null;
    fetchData: () => void;
  } = useFetchData(
    "http://localhost:3001/api/transactions",
    "GET",
    "application/json"
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="transactions-container">
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}

      {!loading && !error && data && (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Data</th>
              <th>Valor</th>
              <th>CPF</th>
              <th>Cartão</th>
              <th>Hora</th>
              <th>Loja</th>
              <th>Dono da Loja</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => (
              <tr key={t.id}>
                <td>{t.type}</td>
                <td>{t.date}</td>
                <td>{formatCurrency(t.amount)}</td>
                <td>{t.cpf}</td>
                <td>{t.card}</td>
                <td>{t.time}</td>
                <td>{t.storeName}</td>
                <td>{t.storeOwner}</td>
                <td>{t.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
