// data-storage.js - this script is responsible for the loading and initialization of data.
function clearData() {
    // Resets Data
    window.localStorage.clear();
    window.location.reload();
}

// Check if there is any data in localStorage, and if there is no data
// initialize it by running the following code
if (window.localStorage.length === 0) {
    window.localStorage.setItem("expenseArray", JSON.stringify([]));
    window.localStorage.setItem("incomeArray", JSON.stringify([]));
}

if (JSON.parse(window.localStorage.getItem("transactionIdTracker")) == null) {
    window.localStorage.setItem("transactionIdTracker", 0);
}

// Load expenseArray and incomeArray from localStorage
const expenseArray = JSON.parse(window.localStorage.getItem("expenseArray"));
const incomeArray = JSON.parse(window.localStorage.getItem("incomeArray"));

// Checks if there is data available to load.
if (expenseArray.length > 0) {
    // Loads list of expenses
    for (let index=0; index < expenseArray.length; index++) {
        document.getElementById("list-of-expenses")
            .appendChild(transactionComponentGenerator(expenseArray[index][1], expenseArray[index][2], expenseArray[index][0]));
    }
}
if (incomeArray.length > 0) {
    // Loads list of incomes
    for (let index=0; index < incomeArray.length; index++) {
        document.getElementById("list-of-incomes")
            .appendChild(transactionComponentGenerator(incomeArray[index][1], incomeArray[index][2], incomeArray[index][0]));
    }
}
