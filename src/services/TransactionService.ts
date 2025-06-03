import { Transaction } from "../models/Transaction";
import { ITransaction, TransactionType } from "../interfaces/ITransaction";
import { IdGenerator } from "../utils/IdGenerator";

// Manages transactions in-memory
export class TransactionService {
  private transactions: ITransaction[] = [];

  // Record a transaction and return it
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

  // Get all transactions for a given account
  public getTransactionsForAccount(accountId: string): ITransaction[] {
    return this.transactions.filter((tx) => tx.accountId === accountId);
  }

  // Get all transactions (e.g., for admin)
  public listAll(): ITransaction[] {
    return [...this.transactions];
  }
}
