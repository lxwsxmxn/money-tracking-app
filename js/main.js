// main.js - app functionality script

function transactionComponentGenerator(transactionName, transactionAmount, id) {
    // Generates a transaction component that will be added to either the income or 
    // expense list.
    let transaction = document.createElement("li");
    transaction.id = id;
    let transactionContainer = document.createElement("div");
    transactionContainer.classList.add("transaction");
    transaction.appendChild(transactionContainer);
    let transactionNameContainer = document.createElement("span");
    transactionNameContainer.innerHTML = transactionName;
    transactionNameContainer.classList.add("transaction-name");
    transactionContainer.appendChild(transactionNameContainer);
    let transactionAmountContainer = document.createElement("span");
    transactionAmountContainer.innerHTML = "R" + transactionAmount;
    transactionAmountContainer.classList.add("transaction-amount");
    transactionContainer.appendChild(transactionAmountContainer);
    transactionContainer.appendChild(transactionComponentButton());
    return transaction;
}

function transactionComponentButton() {
    // Generates the delete and edit for the transaction components.
    let transactionButtonContainer = document.createElement("span");
    transactionButtonContainer.classList.add("transaction-btn-container");
    let deleteButton = `<input type="button" onclick="incomeExpenseRemover(this)" />`
    let editButton = `<input type="button" onclick="incomeExpenseEditor(this)" />`
    transactionButtonContainer.innerHTML = editButton + deleteButton;
    return transactionButtonContainer
}

function storeTransaction(transactionComponentData, transactionType) {
    // Stores transactionComponent in window.localStorage
    if (transactionType === "expense") {
        let expenseArray = JSON.parse(window.localStorage.getItem("expenseArray"));
        expenseArray.push(transactionComponentData);
        window.localStorage.setItem("expenseArray", JSON.stringify(expenseArray));
    }

    if (transactionType === "income") {
        let incomeArray = JSON.parse(window.localStorage.getItem("incomeArray"));
        incomeArray.push(transactionComponentData);
        window.localStorage.setItem("incomeArray", JSON.stringify(incomeArray));
    }
}

function transactionIdGenerator() {
    let transactionIdTracker = JSON.parse(window.localStorage.getItem("transactionIdTracker"));
    window.localStorage.setItem("transactionIdTracker", transactionIdTracker+1);
    return transactionIdTracker;
}

function incomeExpenseAdder(btn, listId) {
    // Adds expense or income to the respective list.
    let btnParentNode = btn.parentNode;
    let transactionType;
    if (btnParentNode.id === "expense-input") transactionType = "expense";
    if (btnParentNode.id === "income-input") transactionType = "income";

    let name = btnParentNode.children[0].children[0].value; // Captures the Name value
    btnParentNode.children[0].children[0].value = ""; // Clears the Name field

    let amount = btnParentNode.children[1].children[0].value; // Captures the Amount value
    btnParentNode.children[1].children[0].value = ""; // Clears the Amount field.

    if (name === "" || amount === "") {
    // Prevents the adding transaction if either of the Name or Amount field is empty.
        return;
    }

    let transactionId = `transaction-${transactionIdGenerator()}`;

    let listContainer = document.getElementById(listId);

    storeTransaction([transactionId, name, amount], transactionType);
    listContainer.appendChild(transactionComponentGenerator(name, amount));
    window.location.reload();
}

function getDataIndexAndType(transactionId) {
    // Returns transaction data index
    let expenseArray = JSON.parse(window.localStorage.getItem("expenseArray"));
    let incomeArray = JSON.parse(window.localStorage.getItem("incomeArray"));

    for (let index = 0; index < expenseArray.length; index++) {
        if (expenseArray[index][0] === transactionId) {
            return {"index": index,
                     "arr": expenseArray,
                     "type": "expenseArray"
                   };
        }
    }

    for (let index = 0; index < incomeArray.length; index++) {
        if (incomeArray[index][0] === transactionId) {
            return {"index": index,
                "arr": incomeArray,
                "type": "incomeArray"
                };
        }
    }
}

function incomeExpenseRemover(btn) {
    // Removes expense or income from the respective list.
    let parentNode = btn.parentNode.parentNode.parentNode;
    let transactionData = getDataIndexAndType(parentNode.id, expenseArray, incomeArray);
    console.log(transactionData)
    let ulNode;
    if (transactionData["type"] === "expenseArray") {
        ulNode = document.getElementById("list-of-expenses");
    }
    if (transactionData["type"] === "incomeArray") {
        ulNode = document.getElementById("list-of-incomes");
    } 

    for (let child of ulNode.children) {
        if (child.id === parentNode.id) {
            ulNode.removeChild(child);
        }
    }
    transactionData["arr"].splice(transactionData["index"], 1);
    let updatedTransactionArray = transactionData["arr"];
    window.localStorage.setItem(transactionData["type"], JSON
        .stringify(updatedTransactionArray));
    window.location.reload();
}

function incomeExpenseEditor(btn) {
    // Edits transactions
    console.log("This function works");
}
