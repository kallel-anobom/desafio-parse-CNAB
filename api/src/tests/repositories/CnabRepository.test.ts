import CnabRepository from "../../repositories/CnabRepository";

jest.mock("../../repositories/CnabRepository");
jest.mock("../../models/Transaction", () => ({
  create: jest.fn(),
}));
describe("CnabRepository", () => {
  let repository: CnabRepository;

  beforeEach(() => {
    repository = new CnabRepository();
    (repository.create as jest.Mock).mockImplementation((transaction) => {
      const { nature, signal, ...filteredTransaction } = transaction;
      return Promise.resolve(filteredTransaction);
    });
  });

  it("should save transaction with correct data", async () => {
    const transactionData = {
      type: 1,
      date: new Date(),
      amount: 100,
      cpf: "12345678901",
      card: "1234****5678",
      time: "120000",
      storeOwner: "John Doe",
      storeName: "Store 1",
      description: "Debito",
      nature: "Saída" as "Entrada" | "Saída",
      signal: "+" as "+" | "-",
    };

    const savedTransaction = await repository.create(transactionData);
    expect(savedTransaction).toMatchObject({
      type: transactionData.type,
      date: transactionData.date,
      amount: transactionData.amount,
      cpf: transactionData.cpf,
      card: transactionData.card,
      time: transactionData.time,
      storeOwner: transactionData.storeOwner,
      storeName: transactionData.storeName,
    });
  });

  it("should remove nature and signal before saving", async () => {
    const transactionData = {
      type: 1,
      date: new Date(),
      amount: 100,
      cpf: "12345678901",
      card: "1234****5678",
      time: "120000",
      storeOwner: "John Doe",
      storeName: "Store 1",
      description: "Debito",
      nature: "Saída" as "Entrada" | "Saída",
      signal: "+" as "+" | "-",
    };

    const savedTransaction = await repository.create(transactionData);

    expect(savedTransaction).not.toHaveProperty("nature");
    expect(savedTransaction).not.toHaveProperty("signal");
  });

  it("should return all transactions with correct data", async () => {
    const transactionsData = [
      {
        type: 1,
        date: new Date(),
        amount: 100,
        cpf: "12345678901",
        card: "1234****5678",
        time: "120000",
        storeOwner: "John Doe",
        storeName: "Store 1",
        nature: "Saída" as "Entrada" | "Saída",
        signal: "+" as "+" | "-",
      },
    ];
  });
});
