import CnabService from "../../services/CnabService";
import CnabRepository from "../../repositories/CnabRepository";
import CnabParser from "../../utils/CnabParser";
import { ITransactionInput, Transaction } from "../../models/Transaction";

jest.mock("../../repositories/CnabRepository");
jest.mock("../../utils/CnabParser");

describe("CnabService", () => {
  let service: CnabService;
  let repositoryMock: jest.Mocked<CnabRepository>;

  beforeEach(() => {
    repositoryMock = new CnabRepository() as jest.Mocked<CnabRepository>;
    service = new CnabService();
    (service as any).repository = repositoryMock;
  });

  it("should process the file and save the transactions", async () => {
    const fileContent =
      "3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO";

    const parsedTransaction: Transaction = {
      id: 1,
      type: 1,
      date: new Date("2023-01-01"),
      amount: 100,
      cpf: "12345678901",
      card: "1234****5678",
      time: "120000",
      storeOwner: "John Doe",
      storeName: "Store 1",
      description: "Crédito em Dinheiro",
    };

    (CnabParser.parse as jest.Mock).mockReturnValue(parsedTransaction);
    repositoryMock.create.mockResolvedValue(parsedTransaction);

    const transactions = await service.processFile(fileContent);

    expect(CnabParser.parse).toHaveBeenCalledTimes(1);
    expect(repositoryMock.create).toHaveBeenCalledTimes(1);
    expect(repositoryMock.create).toHaveBeenCalledWith(parsedTransaction);
    expect(transactions).toEqual([parsedTransaction]);
  });

  it("should return all transactions", async () => {
    const fakeTransactions = [
      {
        id: 1,
        type: 1,
        date: new Date(),
        amount: 100,
        cpf: "12345678901",
        card: "1234****5678",
        time: "120000",
        storeOwner: "John Doe",
        storeName: "Store 1",
        description: "Transaction description",
        nature: "Saída" as "Entrada" | "Saída",
        signal: "+" as "+" | "-",
      },
    ];

    repositoryMock.getAll.mockResolvedValue(fakeTransactions);

    const result = await service.getAllTransactions();

    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeTransactions);
  });
});
