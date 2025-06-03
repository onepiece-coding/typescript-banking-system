import { Account } from "../models/Account";
import { IdGenerator } from "../utils/IdGenerator";
import { CustomerService } from "./CustomerService";

// Manages accounts in-memory
export class AccountService {
  private accounts: Map<string, Account> = new Map();

  // Depends on CustomerService
  private customerService: CustomerService;

  constructor(customerService: CustomerService) {
    this.customerService = customerService;
  }

  // Create a new account for an existing customer
  public createAccount(customerId: string): Account {
    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error("Customer not found!");
    }
    const id = IdGenerator.generate();
    const account = new Account(id, customerId);
    this.accounts.set(id, account);
    return account;
  }

  // Get an account by ID
  public getAccountById(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  // Deposit to an account
  public deposit(accountId: string, amount: number): void {
    const account = this.getAccountById(accountId);
    if (!account) {
      throw new Error("Account not found!");
    }
    account.deposit(amount);
  }

  // Withdraw from an account
  public withdraw(accountId: string, amount: number): void {
    const account = this.getAccountById(accountId);
    if (!account) {
      throw new Error("Account not found!");
    }
    account.withdraw(amount);
  }

  // Transfer money between two accounts
  public transfer(fromId: string, toId: string, amount: number): void {
    if (fromId === toId) {
      throw new Error("Cannot transfer to same account!");
    }
    const fromAccount = this.getAccountById(fromId);
    const toAccount = this.getAccountById(toId);
    if (!fromAccount || !toAccount) {
      throw new Error("One or both accounts not found!");
    }
    // Withdraw from source, deposit to destination
    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
  }

  // List all accounts
  public listAccounts(): Account[] {
    return Array.from(this.accounts.values());
  }
}
