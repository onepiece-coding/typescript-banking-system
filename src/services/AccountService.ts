import { Account } from "../models/Account";
import { IdGenerator } from "../utils/IdGenerator";
import { CustomerService } from "./CustomerService";

export class AccountService {
  private accounts: Map<string, Account> = new Map();
  private customerService: CustomerService;

  constructor(customerService: CustomerService) {
    this.customerService = customerService;
  }

  public createAccount(customerId: string, code: string): Account {
    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) throw new Error("Customer not found");

    // Ensure no other account already uses that code
    const existing = this.getAccountByCode(code);
    if (existing) throw new Error("This code is already in use");

    const id = IdGenerator.generate();
    const account = new Account(id, customerId, code);
    this.accounts.set(id, account);
    return account;
  }

  public getAccountById(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  public getAccountByCode(code: string): Account | undefined {
    for (const acct of this.accounts.values()) {
      if (acct.code === code) return acct;
    }
    return undefined;
  }

  public deposit(accountId: string, amount: number): void {
    const account = this.getAccountById(accountId);
    if (!account) throw new Error("Account not found");
    account.deposit(amount);
  }

  public withdraw(accountId: string, amount: number): void {
    const account = this.getAccountById(accountId);
    if (!account) throw new Error("Account not found");
    account.withdraw(amount);
  }

  public transfer(fromId: string, toId: string, amount: number): void {
    if (fromId === toId) throw new Error("Cannot transfer to same account");
    const fromAccount = this.getAccountById(fromId);
    const toAccount = this.getAccountById(toId);
    if (!fromAccount || !toAccount)
      throw new Error("One or both accounts not found");

    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
  }

  public listAccounts(): Account[] {
    return Array.from(this.accounts.values());
  }

  public deleteAccount(id: string): void {
    if (!this.accounts.delete(id)) {
      throw new Error("Account not found!");
    }
  }
}
