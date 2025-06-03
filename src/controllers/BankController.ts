import { CustomerService } from "../services/CustomerService";
import { AccountService } from "../services/AccountService";
import { TransactionService } from "../services/TransactionService";

// High-level “facade” for banking operations
export class BankController {
  private customerService: CustomerService;
  private accountService: AccountService;
  private transactionService: TransactionService;

  constructor() {
    // Initialize services (dependency injection here is manual)
    this.customerService = new CustomerService();
    this.accountService = new AccountService(this.customerService);
    this.transactionService = new TransactionService();
  }

  // Create a new customer + account at once
  public openAccount(name: string, email: string): string {
    const customer = this.customerService.createCustomer(name, email);
    const account = this.accountService.createAccount(customer.id);
    console.log(`Opened account ${account.id} for customer ${customer.name}`);
    return account.id; // <— return the new account’s ID
  }

  // Deposit and record a transaction
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

  // Withdraw and record a transaction
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

  // Transfer between two accounts and record both sides
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

  // Print balance for an account
  public printBalance(accountId: string): void {
    const account = this.accountService.getAccountById(accountId);
    if (!account) {
      console.log("Account not found!");
      return;
    }
    console.log(`Account ${accountId} balance: $${account.balance.toFixed(2)}`);
  }

  // Print transaction history
  public printTransactionHistory(accountId: string): void {
    const transactions =
      this.transactionService.getTransactionsForAccount(accountId);
    if (transactions.length === 0) {
      console.log("No transactions found for this account!");
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

  // List all customers and their accounts (for demo purposes)
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
