import { BankController } from "./controllers/BankController";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

async function main() {
  const bank = new BankController();

  console.log("=== Welcome to a Simple TypeScript Bank ===\n");

  while (true) {
    // 1) Ask for 4-digit code
    const code = prompt(
      'Enter your 4-digit account code (or type "exit" to quit): '
    );
    if (!code || code.toLowerCase() === "exit") {
      console.log("Goodbye!");
      process.exit(0);
    }
    if (!/^\d{4}$/.test(code)) {
      console.log("  ↳ Please enter exactly 4 digits.\n");
      continue;
    }

    // 2) Attempt to find an account with that code
    const acct = bank.getAccountByCode(code);
    let accountId: string;
    let customerId: string;

    if (!acct) {
      // No such account—offer to create one
      const create = prompt(
        "Account not found. Create a new account with this code? (y/n): "
      );
      if (!create || create.toLowerCase() !== "y") {
        console.log("  ↳ Returning to code prompt.\n");
        continue;
      }

      // Gather name & email
      const name = prompt("  Enter your full name: ");
      const email = prompt("  Enter your email address: ");
      if (!name || !email) {
        console.log("  ↳ Name and email cannot be empty.\n");
        continue;
      }

      // 2a) Create a new Customer using YOUR customerService
      const newCust = bank.createCustomer(name, email);

      try {
        // 2b) Create a new Account using YOUR accountService (so its Map is populated)
        const newAcct = bank.createAccount(newCust.id, code);

        console.log(
          `Opened account ${newAcct.id} for customer ${newCust.name}`
        );

        accountId = newAcct.id;
        customerId = newCust.id;
      } catch (err: any) {
        console.log(`  ↳ Error: ${err.message}\n`);
        continue;
      }
    } else {
      // Existing account
      accountId = acct.id;
      customerId = acct.customerId;
      console.log(`  ↳ Welcome back! (Account ID: ${accountId})\n`);
    }

    // 3) Show menu for this logged-in user
    let inMenu = true;
    while (inMenu) {
      console.log("Choose an operation:");
      console.log("  1) Deposit");
      console.log("  2) Withdraw");
      console.log("  3) Transfer");
      console.log("  4) Show Balance & History");
      console.log("  5) Delete Account");
      console.log("  6) Logout");
      const choice = prompt("  Enter 1-6: ");

      try {
        switch (choice) {
          case "1": {
            const amtStr = prompt("  How much do you want to deposit? ");
            const amt = Number(amtStr);
            if (isNaN(amt) || amt <= 0) {
              console.log("    ↳ Amount must be a positive number.\n");
              break;
            }
            bank.depositToAccount(accountId, amt);
            break;
          }
          case "2": {
            const amtStr = prompt("  How much do you want to withdraw? ");
            const amt = Number(amtStr);
            if (isNaN(amt) || amt <= 0) {
              console.log("    ↳ Amount must be a positive number.\n");
              break;
            }
            bank.withdrawFromAccount(accountId, amt);

            break;
          }
          case "3": {
            // TRANSFER: ask for recipient account ID (not their code)
            const targetId = prompt("  Recipient account ID: ");
            if (!targetId) {
              console.log("    ↳ Please enter a valid Account ID.\n");
              break;
            }
            const targetAcct = bank.getAccountById(targetId);
            if (!targetAcct) {
              console.log("    ↳ Recipient not found.\n");
              break;
            }
            const amtStr = prompt("  Amount to transfer: ");
            const amt = Number(amtStr);
            if (isNaN(amt) || amt <= 0) {
              console.log("    ↳ Amount must be a positive number.\n");
              break;
            }

            bank.transferFunds(accountId, targetId, amt);
            break;
          }
          case "4": {
            // Show balance
            bank.printBalance(accountId);
            // Show transaction history
            bank.printTransactionHistory(accountId);
            break;
          }
          case "5": {
            const confirm = prompt(
              "  Are you sure you want to DELETE your account and all transactions? (y/n): "
            );
            if (confirm && confirm.toLowerCase() === "y") {
              // 5a) Delete all transactions for this account
              const txs = bank.getTransactionsForAccount(accountId);
              for (const tx of txs) {
                bank.deleteTransaction(tx.id);
              }
              // 5b) Delete the account itself
              bank.deleteAccount(accountId);
              // 5c) Delete the customer
              bank.deleteCustomer(customerId);
              console.log(
                "    ↳ Your account and all data have been deleted.\n"
              );
              inMenu = false; // log out
            } else {
              console.log("    ↳ Deletion cancelled.\n");
            }
            break;
          }
          case "6": {
            console.log("    ↳ Logging out...\n");
            inMenu = false;
            break;
          }
          default: {
            console.log("    ↳ Invalid choice. Please enter 1–6.\n");
          }
        }
      } catch (error: any) {
        // Single place to catch *any* errors in the menu
        console.log(`    ↳ Error: ${error.message}\n`);
      }
    }
    // back to code prompt loop
  }
}

main();
