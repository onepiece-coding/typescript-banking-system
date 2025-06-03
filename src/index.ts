import { BankController } from "./controllers/BankController";

// Create bank controller (all services are initialized inside)
const bank = new BankController();

// 1. Open two accounts
const aliceAccountId = bank.openAccount("Alice Johnson", "alice@example.com");
const bobAccountId = bank.openAccount("Bob Smith", "bob@example.com");

// 2. Deposit to Alice’s account
bank.depositToAccount(aliceAccountId, 500);

// 3. Withdraw from Alice’s account
bank.withdrawFromAccount(aliceAccountId, 200);

// 4. Transfer from Alice to Bob
bank.transferFunds(aliceAccountId, bobAccountId, 100);

// 5. Print balances
bank.printBalance(aliceAccountId); // 200
bank.printBalance(bobAccountId); // 100

// 6. Print transaction history for Alice
bank.printTransactionHistory(aliceAccountId);

// 6. Print transaction history for Alice and Bob
bank.printTransactionHistory(aliceAccountId);
bank.printTransactionHistory(bobAccountId);

// 7. List all data (customers + accounts)
bank.listAllData();
