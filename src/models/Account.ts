import { IAccount } from "../interfaces/IAccount";

// Account class implements IAccount contract
export class Account implements IAccount {
  public id: string;
  public customerId: string;
  public balance: number;
  public code: string;

  constructor(id: string, customerId: string, code: string) {
    this.id = id;
    this.customerId = customerId;
    this.balance = 0; // start with zero balance
    this.code = code;
  }

  // Deposit money into account
  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;
  }

  // Withdraw money (no negative balance allowed)
  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }
}
