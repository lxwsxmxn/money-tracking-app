// Total Element Selection
const totalIncomeElem = document.getElementById("total-income");
const totalOutcomeElem = document.getElementById("total-outcome");
const availableFundsElem = document.getElementById("available-funds");

// Total Calcutions
function calculateTotalOfTransactions(transactionArray) {
    let transactionTotal = 0;
    for (let index = 0; index < transactionArray.length; index++) {
        transactionTotal += Number(transactionArray[index][2]);
    }
    return transactionTotal;
}

if (expenseArray.length > 0) {
    totalOutcomeElem.innerHTML = calculateTotalOfTransactions(expenseArray);
}
if (incomeArray.length > 0) {
    totalIncomeElem.innerHTML = calculateTotalOfTransactions(incomeArray);
}
availableFundsElem.innerHTML = Number(totalIncomeElem.innerHTML) - Number(totalOutcomeElem.innerHTML);

// Chart


