// CLI Application: Bank Management System
// Build a command-line JavaScript application (using Node.js readline/promises) that manages bank accounts using arrays, objects, switch statements, if/else conditions, and array methods (.find(), .filter(), .map()).
// Section 1: Data Model & State
// Store accounts in an array of account objects with the following baseline structure:

// const accounts = [
//   {
//     accountNumber: "1001",
//     holderName: "Rohan Sharma",
//     accountType: "savings", // "savings" | "checking"
//     balance: 2500.0,
//     isActive: true,
//   },
// ];
// Section 2: Required Functions & Methods
// Implement the core logic using specific JavaScript array methods and control flow structures:

// findAccount(accounts, accountNumber)
// Uses .find() to locate and return the matching account object (or undefined if not found).
// processTransaction(account, type, amount)
// Uses if / else to validate positive amounts and active account status.
// Uses a switch statement ("deposit", "withdraw", "freeze", "unfreeze") to update the account object:
// "deposit" — adds amount to account.balance.
// "withdraw" — checks if / else that account.balance covers amount before subtracting from account.balance.
// "freeze" / "unfreeze" — toggles account.isActive.
// getAccountsByStatus(accounts, activeOnly)
// Uses .filter() to return either active accounts or frozen/inactive accounts.
// formatAccountStatements(accounts, interestRate)
// Uses .map() to return a new array of formatted summary strings showing account number, holder name, type, current balance, and projected annual interest (balance * interestRate).
// runBankCli()
// Runs the interactive CLI menu loop using a switch statement for user actions:
// 1: Create Account
// 2: Deposit
// 3: Withdraw
// 4: Freeze/Unfreeze
// 5: View Statements
// 6: Filter Accounts
// 0: Exit
// Section 3: Core Flow Requirements
// Validation Rules: Use if / else to guard against duplicate account numbers, inactive accounts, non-positive amounts, and insufficient funds.
// Control Structures: Use switch both for transaction types and for the main CLI menu options.
// Array Method Usage: Use .find() before mutating a specific account, .filter() to list filtered subsets (such as active vs. frozen accounts), and .map() to transform account objects into formatted statement lines.
// Section 4: Sample Session Output
// === Bank Management CLI ===
// 1. Create Account
// 2. Deposit
// 3. Withdraw
// 4. Freeze / Unfreeze Account
// 5. View Account Statements
// 6. Filter Accounts by Status
// 0. Exit

// Choose an option: 2
// Account number: 1001
// Deposit amount: 500
// Deposited $500.00 into 1001 (Rohan Sharma). New balance: $3000.00.

// Choose an option: 5
// --- Account Statements (3.5% Annual Interest) ---

// [ACTIVE] #1001 | Rohan Sharma (savings) | Balance: $3000.00 | Est. Interest: $105.00
// |---|---|


// Simple Bank CLI - run with: node bank_simple.js
const readline = require("readline/promises");
 
const accounts = [
  {
    accountNumber: "1001",
    holderName: "Rohan Sharma",
    accountType: "savings",
    balance: 2500.0,
    isActive: true,
  },
];
 
// Find one account by number
function findAccount(accounts, accountNumber) {
  return accounts.find((acc) => acc.accountNumber === accountNumber);
}
 
// Deposit, withdraw, freeze or unfreeze
function processTransaction(account, type, amount) {
  if (type === "deposit" || type === "withdraw") {
    if (amount <= 0 || isNaN(amount)) {
      return "Amount must be positive.";
    }
    if (!account.isActive) {
      return "Account is frozen.";
    }
  }
  switch (type) {
    case "deposit":
      account.balance += amount;
      return "Deposit successful.";
    case "withdraw":
      if (account.balance >= amount) {
        account.balance -= amount;
        return "Withdrawal successful.";
      } else {
        return "Insufficient funds.";
      }
    case "freeze":
      account.isActive = false;
      return "Account frozen.";
    case "unfreeze":
      account.isActive = true;
      return "Account unfrozen.";
    default:
      return "Invalid transaction type.";
  }
}

// Keep only active (true) or frozen (false) accounts
function getAccountsByStatus(accounts, activeOnly) {
  return accounts.filter((acc) => acc.isActive === activeOnly);
}

// Turn each account into a text line
function formatAccountStatements(accounts, interestRate) {
  return accounts.map((acc) => {
    const status = acc.isActive ? "ACTIVE" : "FROZEN";
    const interest = acc.balance * interestRate;
    return (
      "[" + status + "] #" + acc.accountNumber + " | " + acc.holderName +
      " (" + acc.accountType + ") | Balance: $" + acc.balance.toFixed(2) +
      " | Est. Interest: $" + interest.toFixed(2)
    );
  });
}


async function runBankCli() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let running = true;

  while (running) {
    console.log("\n=== Bank Management CLI ===");
    console.log("1. Create Account");
    console.log("2. Deposit");
    console.log("3. Withdraw");
    console.log("4. Freeze / Unfreeze Account");
    console.log("5. View Account Statements");
    console.log("6. Filter Accounts by Status");
    console.log("0. Exit");

    const choice = await rl.question("\nChoose an option: ");

    switch (choice) {
      case "1": {
        const number = await rl.question("Account number: ");
        if (findAccount(accounts, number)) {
          console.log("Account number already exists.");
          break;
        }
        const name = await rl.question("Holder name: ");
        const type = await rl.question("Type (savings/checking): ");
        const balance = Number(await rl.question("Opening balance: "));

        accounts.push({
          accountNumber: number,
          holderName: name,
          accountType: type,
          balance: balance,
          isActive: true,
        });
        console.log("Account created.");
        break;
      }

      case "2": {
        const account = findAccount(accounts, await rl.question("Account number: "));
        if (!account) {
          console.log("Account not found.");
          break;
        }
        const amount = Number(await rl.question("Deposit amount: "));
        console.log(processTransaction(account, "deposit", amount));
        break;
      }

      case "3": {
        const account = findAccount(accounts, await rl.question("Account number: "));
        if (!account) {
          console.log("Account not found.");
          break;
        }
        const amount = Number(await rl.question("Withdraw amount: "));
        console.log(processTransaction(account, "withdraw", amount));
        break;
      }

      case "4": {
        const account = findAccount(accounts, await rl.question("Account number: "));
        if (!account) {
          console.log("Account not found.");
          break;
        }
        // If active -> freeze, if frozen -> unfreeze
        const type = account.isActive ? "freeze" : "unfreeze";
        console.log(processTransaction(account, type, 0));
        break;
      }

      case "5": {
        console.log("\n--- Account Statements (3.5% Annual Interest) ---\n");
        const lines = formatAccountStatements(accounts, 0.035);
        lines.forEach((line) => console.log(line));
        break;
      }

      case "6": {
        const answer = await rl.question("Show active or frozen? ");
        const list = getAccountsByStatus(accounts, answer === "active");
        const lines = formatAccountStatements(list, 0.035);
        console.log("");
        lines.forEach((line) => console.log(line));
        break;
      }

      case "0":
        console.log("Goodbye!");
        running = false;
        break;

      default:
        console.log("Invalid option.");
    }
  }

  rl.close();
}

runBankCli();