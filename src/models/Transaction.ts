import { ITransaction, TransactionType } from "../interfaces/ITransaction";

// Transaction class holds a single record
export class Transaction implements ITransaction {
  public id: string;
  public accountId: string;
  public type: TransactionType;
  public amount: number;
  public date: Date;
  public description: string;

  constructor(
    id: string,
    accountId: string,
    type: TransactionType,
    amount: number,
    description: string
  ) {
    this.id = id;
    this.accountId = accountId;
    this.type = type;
    this.amount = amount;
    this.date = new Date(); // set timestamp now
    this.description = description;
  }
}
