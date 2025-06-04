# Simple TypeScript Banking App

A small console‐based banking application written in TypeScript. You can open an account with a 4-digit code, deposit, withdraw, transfer (by account ID), view balance/history, or delete your account. Everything runs in memory—no database needed.

---

## Features

- **4-Digit Code Login**
  Each account has its own 4-digit code. You log in by typing your code.
  
- **Create Account**
  If the code doesn’t exist yet, you can create a new account (enter your name and email).
  
- **Deposit & Withdraw**  
  Add money or take money out of your account.
  
- **Transfer by Account ID**  
  Send money to another account by typing its account ID (no one else’s code is needed).
  
- **View Balance & History**  
  See your current balance and a list of all transactions.
  
- **Delete Account**  
  Remove your account, its customer data, and all transactions.  

---

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

- **controllers/**: High‐level operations (open account, deposit, withdraw, transfer).
  
- **interfaces/**: TypeScript interfaces for Account, Customer, Transaction.
  
- **models/**: Classes that implement business logic.
  
- **services/**: In‐memory storage and methods (create, read, delete).
  
- **utils/**: Helper functions (simple ID generator).
  
- **index.ts**: The main file with a console menu and “prompt‐sync” for user input.

---

## Prerequisites

- **Node.js** (version 14.x or later)
  
- **npm** (comes with Node.js)
  
- **TypeScript** and **ts-node** installed as dev dependencies  

You only need to install dependencies once.  

---

## Installation

1. **Clone this repo**
   
   ```bash
   git clone https://github.com/onepiece-coding/typescript-banking-system.git
   
   cd typescript-banking-system
   
2. **Install packages**

   ```bash
   npm install
   
3. Install prompt-sync (for console input)

   ```bash
   npm install prompt-sync
   
## How to Run

1. **Compile & Run (no build step needed)**

   ```bash
   npm start
   
This runs ts-node src/index.ts and starts the console app.

2. **Follow the on-screen prompts:**

- Enter your 4-digit code (type “exit” to quit).

- If the code is new, choose “y” to create an account, then enter your name and email.

- Once logged in, pick an operation (deposit, withdraw, transfer, view, delete, or logout).

##Usage Guide

1. **Login / Create Account**

- When asked for your 4-digit code, type it and press Enter.

- If no account exists with that code, you’ll be asked “Create new account? (y/n)”.

- If you type “y”, enter your name and email to finish creating your account.

2. **Menu Operations**

Once you’re logged in (or just created an account), you’ll see options:

1. Deposit

2. Withdraw

3. Transfer

4. Show Balance & History

5. Delete Account

6. Logout

- Deposit: Type how much you want to add.

- Withdraw: Type how much you want to take out.

- Transfer: Enter the other person’s account ID (not their code), then enter amount.

- Show Balance & History: Shows your current balance and a list of all transactions.

- Delete Account: Permanently removes your account, customer info, and all transactions.

- Logout: Return to the 4-digit code prompt.

3. **Exit**
   
At any time, type “exit” when asked for your code to quit the app.

## Example Session

    === Welcome to a Simple TypeScript Bank ===
    
    Enter your 4-digit account code (or type "exit" to quit): 1234
    Account not found. Create a new account with this code? (y/n): y
      Enter your full name: Alice
      Enter your email address: alice@example.com
      ↳ New account created! Your account ID is x1a2b3c4
    
    Choose an operation:
      1) Deposit
      2) Withdraw
      3) Transfer
      4) Show Balance & History
      5) Delete Account
      6) Logout
      Enter 1-6: 1
      How much do you want to deposit? 500
        ↳ Deposit successful.
    
    Choose an operation:
      1) Deposit
      2) Withdraw
      3) Transfer
      4) Show Balance & History
      5) Delete Account
      6) Logout
      Enter 1-6: 4
    Account x1a2b3c4 balance: $500.00
    Transaction history for x1a2b3c4:
    [9/1/2025, 11:20:30 AM] DEPOSIT $500 — Deposit of $500
    
    Choose an operation:
      1) Deposit
      2) Withdraw
      3) Transfer
      4) Show Balance & History
      5) Delete Account
      6) Logout
      Enter 1-6: 6
        ↳ Logging out...
    
    Enter your 4-digit account code (or type "exit" to quit): exit
    Goodbye!

## Dependencies

- [TypeScript](https://www.typescriptlang.org/)

- (ts-node)[https://www.npmjs.com/package/ts-node]

- (prompt-sync)[https://www.npmjs.com/package/prompt-sync]

## Notes

- All data is stored in memory. If you stop the app, all accounts and transactions are lost.

- No two accounts can share the same 4-digit code.

- Transfers require knowing the recipient’s account ID, not their code.

## Connect With Me

github: https://github.com/onepiece-coding

LinkedIn: https://www.linkedin.com/in/lahcen-alhiane-0799ba303/

Thanks for checking out this app! If you have questions or feedback, feel free to open an issue.

🚀 Happy Coding!
