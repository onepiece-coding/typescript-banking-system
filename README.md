# Banking System App (TypeScript)

A simple banking system implemented in TypeScript, following OOP and SOLID principles. This project demonstrates a clear folder structure with interfaces, models, services, and a controller. It runs entirely in memory (no external database).

## Folder Structure
    
    banking-app/
    
    ├── package.json
    
    ├── tsconfig.json
    
    └── src/
    
    ├── controllers/
    
    │ └── BankController.ts
    
    ├── interfaces/
    
    │ ├── IAccount.ts
    
    │ ├── ICustomer.ts
    
    │ └── ITransaction.ts
    
    ├── models/
    
    │ ├── Account.ts
    
    │ ├── Customer.ts
    
    │ └── Transaction.ts
    
    ├── services/
    
    │ ├── AccountService.ts
    
    │ ├── CustomerService.ts
    
    │ └── TransactionService.ts
    
    ├── utils/
    
    │ └── IdGenerator.ts
    
    └── index.ts

## Description

- **Interfaces** define contracts for Account, Customer, and Transaction.
  
- **Models** implement these interfaces, encapsulating business logic (e.g., deposit, withdraw).
  
- **Services** manage in-memory data storage and operations (creating customers/accounts, recording transactions).
  
- **BankController** orchestrates high-level banking flows (open account, deposit, withdraw, transfer).
  
- **index.ts** demonstrates usage of the banking system with sample operations.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
  
- [npm](https://www.npmjs.com/) (comes with Node.js)
  
- TypeScript installed as a dev dependency

## Installation

1. **Clone the repository**
   
   ```bash
   
   git clone https://github.com/onepiece-coding/typescript-banking-system.git
   
   cd banking-app
   
2. **Install dependencies**

   ```bash
    
   npm install
 
This will install:

- typescript

- ts-node

- @types/node

3. **(Optional) Verify TypeScript configuration**

The default tsconfig.json is already set up. You can adjust compiler options if needed.

## How to Run?

Use ts-node to run the TypeScript source directly:

    npm start

- This executes src/index.ts via ts-node.

- You should see console output demonstrating:

1. Opening two accounts

2. Depositing, withdrawing, and transferring funds

3. Printing balances and transaction history

4. Listing all customers and accounts

### Sample Output
    
    Opened account X1 for customer Alice Johnson
    Opened account X2 for customer Bob Smith
    
    Deposited $500 into account X1
    
    Withdrew $200 from account X1
    
    Transferred $100 from X1 to X2
    
    Account X1 balance: $200.00
    Account X2 balance: $100.00
    
    Transaction history for X1:
    [6/3/2025, 10:00:00 AM] DEPOSIT $500 — Deposit of $500
    [6/3/2025, 10:00:00 AM] WITHDRAW $200 — Withdrawal of $200
    [6/3/2025, 10:00:00 AM] TRANSFER $100 — Transfer of $100 to account X2
    
    All customers:
    - C1: Alice Johnson (alice@example.com)
    - C2: Bob Smith (bob@example.com)
    
    All accounts:
    - X1: customer C1 — balance $200
    - X2: customer C2 — balance $100
  
## Build (Optional)

To compile TypeScript into JavaScript under dist/:

    npm run build
    
- Compiled files will appear in dist/.

- You can then run node dist/index.js.

## Usage

- To open an account, call bank.openAccount(name, email) in index.ts.

- To deposit, withdraw, or transfer, use:

1. bank.depositToAccount(accountId, amount)

2. bank.withdrawFromAccount(accountId, amount)

3. bank.transferFunds(fromId, toId, amount)

- To print balances and transaction history:

1. bank.printBalance(accountId)

2. bank.printTransactionHistory(accountId)

- To list all customers/accounts:

   ```bash
   bank.listAllData();
   
Adjust src/index.ts as needed to add more operations or interact differently.

## Connect With Me

github: https://github.com/onepiece-coding

LinkedIn: https://www.linkedin.com/in/lahcen-alhiane-0799ba303/

🚀 Happy Coding!
