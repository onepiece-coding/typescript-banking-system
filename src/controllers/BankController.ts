import { CustomerService } from "../services/CustomerService";
import { AccountService } from "../services/AccountService";
import { TransactionService } from "../services/TransactionService";
import { ITransaction } from "../interfaces/ITransaction";
import { IAccount } from "../interfaces/IAccount";
import { ICustomer } from "../interfaces/ICustomer";

export class BankController {
  private customerService: CustomerService;
  private accountService: AccountService;
  private transactionService: TransactionService;

  constructor() {
    this.customerService = new CustomerService();
    this.accountService = new AccountService(this.customerService);
    this.transactionService = new TransactionService();
  }

  public createCustomer(name: string, email: string): ICustomer {
    return this.customerService.createCustomer(name, email);
  }

  public deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id);
  }

  public createAccount(customerId: string, code: string): IAccount {
    return this.accountService.createAccount(customerId, code);
  }

  public getAccountById(id: string): IAccount | undefined {
    return this.accountService.getAccountById(id);
  }

  public getAccountByCode(id: string): IAccount | undefined {
    return this.accountService.getAccountByCode(id);
  }

  public depositToAccount(accountId: string, amount: number): void {
    this.accountService.deposit(accountId, amount);
    this.transactionService.record(
      accountId,
      "DEPOSIT",
      amount,
      `Deposit of $${amount}`
    );
    console.log(`Deposited $${amount} into account ${accountId}`);
  }

  public withdrawFromAccount(accountId: string, amount: number): void {
    this.accountService.withdraw(accountId, amount);
    this.transactionService.record(
      accountId,
      "WITHDRAW",
      amount,
      `Withdrawal of $${amount}`
    );
    console.log(`Withdrew $${amount} from account ${accountId}`);
  }

  public deleteAccount(id: string): void {
    this.accountService.deleteAccount(id);
  }

  public transferFunds(fromId: string, toId: string, amount: number): void {
    this.accountService.transfer(fromId, toId, amount);
    this.transactionService.record(
      fromId,
      "TRANSFER",
      amount,
      `Transfer of $${amount} to account ${toId}`
    );
    this.transactionService.record(
      toId,
      "TRANSFER",
      amount,
      `Received $${amount} from account ${fromId}`
    );
    console.log(`Transferred $${amount} from ${fromId} to ${toId}`);
  }

  public getTransactionsForAccount(accountId: string): ITransaction[] {
    return this.transactionService.getTransactionsForAccount(accountId);
  }

  public printTransactionHistory(accountId: string): void {
    const transactions =
      this.transactionService.getTransactionsForAccount(accountId);
    if (transactions.length === 0) {
      console.log("No transactions found for this account");
      return;
    }
    console.log(`Transaction history for ${accountId}:`);
    for (const tx of transactions) {
      console.log(
        `[${tx.date.toLocaleString()}] ${tx.type} $${tx.amount} — ${
          tx.description
        }`
      );
    }
  }

  public deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id);
  }

  public printBalance(accountId: string): void {
    const account = this.accountService.getAccountById(accountId);
    if (!account) {
      console.log("Account not found");
      return;
    }
    console.log(`Account ${accountId} balance: $${account.balance.toFixed(2)}`);
  }

  public listAllData(): void {
    console.log("All customers:");
    for (const c of this.customerService.listCustomers()) {
      console.log(`- ${c.id}: ${c.name} (${c.email})`);
    }
    console.log("\nAll accounts:");
    for (const a of this.accountService.listAccounts()) {
      console.log(
        `- ${a.id}: customer ${a.customerId} — balance $${a.balance}`
      );
    }
  }
}
