
# 💸 Expense Tracker CLI

A simple command-line based Expense Tracker built with Node.js. It allows users to add, update, delete, list, and summarize expenses saved in a local JSON file.

## 🚀 Features

- ✅ Add an expense with a description and amount
- ✅ Update an existing expense by ID
- ✅ Delete an expense by ID
- ✅ View all recorded expenses
- ✅ View total expenses
- ✅ View total expenses for a specific month (of the current year)
- 📁 Data is saved to a local `expenses.json` file

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v12 or later

---
## 🚀 Setup

  

1. **Clone the repository** or download the files.
---

## 📂 Project Structure
```
.
├── index.js           # Main CLI script
├── expenses.json      # Stores expenses
└── README.md          # Project documentation
```
---
## 🛠️ Usage
Run the app using `node index.js` followed by a command:

### Add an Expense
```bash
node index.js add --description "Lunch" --amount 120
```
### List All Expenses
```bash
node index.js list
```
### Delete Expense
```bash
node index.js delete --id 1
```
### Update Expense
```bash
node index.js update --id 1 --description "Dinner" --amount 150
```
### Show Summary of All Expenses
```bash
node index.js summary
```
### Show Summary for a Specific Month
```bash
node index.js summary --month 5
```
---

## 📌 Notes

 - Dates are automatically recorded in `YYYY-MM-DD` format.
 - Expenses are stored with `id`, `description`, `amount`, and `date`.
 - JSON parsing errors or invalid inputs will exit the program with an error message.
 ---

## 🧪 Example
```bash
node index.js add --description "Groceries" --amount 300
node index.js list
# ID  Date       Description     Amount
# 1   2025-05-10  Groceries       $300

node index.js summary
# Total expenses: $300
```
---
## 📁 Project URL
https://roadmap.sh/projects/expense-tracker
