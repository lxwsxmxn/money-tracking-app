function toggleList(btn) {
    // Toggles between the expense and income lists

    // Select list containers
    const expenseContainer = document.getElementById("expense-container");
    const incomeContainer = document.getElementById("income-container");
    
    if (btn.id == "expense-toggle-button") {
        expenseContainer.classList.remove("hide");
        incomeContainer.classList.add("hide");
    }
    if (btn.id == "income-toggle-button") {
        incomeContainer.classList.remove("hide");
        expenseContainer.classList.add("hide");
    }
}
