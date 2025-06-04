import { Transaction } from "../models/Transaction";
import { TransactionType } from "../interfaces/ITransaction";
import { IdGenerator } from "../utils/IdGenerator";

export class TransactionService {
  private transactions: Transaction[] = [];

  public record(
    accountId: string,
    type: TransactionType,
    amount: number,
    description: string
  ): Transaction {
    const id = IdGenerator.generate();
    const tx = new Transaction(id, accountId, type, amount, description);
    this.transactions.push(tx);
    return tx;
  }

  public getTransactionsForAccount(accountId: string): Transaction[] {
    return this.transactions.filter((tx) => tx.accountId === accountId);
  }

  public listAll(): Transaction[] {
    return [...this.transactions];
  }

  public deleteTransaction(id: string): void {
    const idx = this.transactions.findIndex((tx) => tx.id === id);
    if (idx === -1) throw new Error("Transaction not found");
    this.transactions.splice(idx, 1);
  }
}
