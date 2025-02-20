import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: number;

  @Column()
  date!: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column()
  cpf!: string;

  @Column()
  card!: string;

  @Column()
  time!: string;

  @Column()
  storeOwner!: string;

  @Column()
  storeName!: string;

  @Column()
  description!: string;
}
export interface ITransactionInput {
  type: number;
  date: Date;
  amount: number;
  cpf: string;
  card: string;
  time: string;
  storeOwner: string;
  storeName: string;
  nature: "Entrada" | "Saída";
  signal: "+" | "-";
}

export interface ITransaction extends ITransactionInput {}
