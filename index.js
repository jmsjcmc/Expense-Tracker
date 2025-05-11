const fs = require("fs");
const path = "./expenses.json";

/**
 * Loads expenses from the JSON file.
 * Creates the file if it doesn't exist.
 * @returns {Array} List of expense objects.
 */
function loadExpenses() {
  // Check if file exists; if not, create empty array file  
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]");
  }

  const content = fs.readFileSync(path, "utf8");
  // If file is empty, return empty list
  if (!content.trim()) {
    return [];
  }
  // Try to parse JSON, exit if content is not valid JSON
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Error: Invalid JSON format");
    process.exit(1);
  }
}

/**
 * Saves the given expenses array to the JSON file.
 * @param {Array} expenses - Array of expense objects.
 */
function saveExpenses(expenses) {
  fs.writeFileSync(path, JSON.stringify(expenses, null, 2));
}

/**
 * Adds a new expense to the file.
 * Expects --description and --amount in args.
 * @param {Array} args - Command line arguments.
 */
function addExpense(args) {
    // Extract values from arguments
  const description = args[args.indexOf("--description") + 1];
  const amount = parseFloat(args[args.indexOf("--amount") + 1]);
    // Validate description and amount
  if (!description || isNaN(amount) || amount <= 0) {
    console.error("Invalid description or amount.");
    process.exit(1);
  }

  const expenses = loadExpenses();
  // Generate new ID based on last expense, or start at 1
  const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
  // Create new expense 
  const newExpense = {
    id,
    description,
    amount,
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
  };
  // Add list and save
  expenses.push(newExpense);
  saveExpenses(expenses);

  console.log(`Expense added successfully (ID: ${id})`);
}

/**
 * Lists all saved expenses in a formatted table.
 */
function listExpenses() {
  const expenses = loadExpenses();
  if (expenses.length === 0) {
    console.log("No expenses found.");
  } else {
    console.log("ID  Date       Description     Amount");
    expenses.forEach((e) => {
      console.log(
        `${e.id.toString().padEnd(3)} ${e.date}  ${e.description.padEnd(
          15
        )} $${e.amount}`
      );
    });
  }
}

/**
 * Deletes an expense by ID.
 * Expects --id in args.
 * @param {Array} args - Command line arguments.
 */
function deleteExpense(args) {
  const id = parseInt(args[args.indexOf("--id") + 1]);
  const expenses = loadExpenses();
  // Find index of expense with matching ID
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    console.error("Expense not found.");
    process.exit(1);
  }
  // Remove expense and save updated list
  expenses.splice(index, 1);
  saveExpenses(expenses);

  console.log("Expense deleted successfully");
}

/**
 * Updates an expense by ID.
 * Expects --id and optionally --description and/or --amount in args.
 * @param {Array} args - Command line arguments.
 */
function updateExpense(args) {
  const id = parseInt(args[args.indexOf("--id") + 1]);
  // Get new values only if they exist in args
  const description = args.includes("--description")
    ? args[args.indexOf("--description") + 1]
    : null;
  const amount = args.includes("--amount")
    ? parseFloat(args[args.indexOf("--amount") + 1])
    : null;

  const expenses = loadExpenses();
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    console.error("Expense not found.");
    process.exit(1);
  }
  // Update values if provided and valid
  if (description) expense.description = description;
  if (!isNaN(amount) && amount > 0) expense.amount = amount;

  saveExpenses(expenses);
  console.log("Expense updated successfully");
}

/**
 * Displays the total expense amount.
 * Optional: --month to filter expenses by month.
 * @param {Array} args - Command line arguments.
 */
function showSummary(args) {
  const expenses = loadExpenses();
  // Check if --month is passed, get its value
  const monthArgIndex = args.indexOf("--month");
  const month =
    monthArgIndex !== -1 ? parseInt(args[monthArgIndex + 1]) : null;
    // Filter by month if given, otherwise use all
  const filtered = month
    ? expenses.filter((e) => new Date(e.date).getMonth() + 1 === month)
    : expenses;
    // Calculate total amount
  const total = filtered.reduce((sum, e) => sum + e.amount, 0);
  console.log(
    `Total expenses${month ? ` for month ${month}` : ""}: $${total}`
  );
}

/**
 * Prints the list of supported commands.
 */
function showHelp() {
  console.log(`
Commands:
node index.js add --description "Text" --amount 100
node index.js list
node index.js delete --id 1
node index.js update --id 1 [--description "New"] [--amount 50]
node index.js summary [--month 5]
`);
}

const args = process.argv.slice(2); // Get CLI args excluding node and script path
const command = args[0]; // First argument is command

switch (command) {
  case "add":
    addExpense(args);
    break;
  case "list":
    listExpenses();
    break;
  case "delete":
    deleteExpense(args);
    break;
  case "update":
    updateExpense(args);
    break;
  case "summary":
    showSummary(args);
    break;
  default:
    showHelp();
    break;
}
