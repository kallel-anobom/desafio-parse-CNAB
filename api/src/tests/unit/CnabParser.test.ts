import CnabParser from "../../utils/CnabParser";

describe("CnabParser", () => {
  it("should parse a CNAB string", () => {
    const line =
      "3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO";
    const result = CnabParser.parse(line);

    expect(result.type).toBe(3);
    expect(result.amount).toBe(142);
    expect(result.cpf).toBe("09620676017");
    expect(result.card).toBe("4753****3153");
    expect(result.date).toEqual(new Date(2019, 2, 1));
    expect(result.time).toBe("153453");
    expect(result.storeOwner).toBe("JOÃO MACEDO");
    expect(result.storeName).toBe("BAR DO JOÃO");
  });
});
