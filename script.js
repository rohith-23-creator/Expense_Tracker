const total = document.getElementById("balance-total");
const totalIncome = document.getElementById("income-total");
const totalExpense= document.getElementById("expense-total");
const form = document.getElementById("transaction-form");
const source = document.getElementById("source-input");
const amountInput = document.getElementById("amount-input");
const list = document.getElementById("transaction-list");


// Parse the values to persist in the local storage
let localStorageItems = (JSON.parse(localStorage.getItem("transactions")));

let transactions = localStorage.getItem("transactions") !== null ? localStorageItems : []  ;


// Adding transactions to the DOM
function addTransactionsToDOM(transaction){
    const check = transaction.amount > 0 ? "+" : "-";

    const transactionItem = document.createElement("li");

    transactionItem.classList.add(transaction.amount > 0 ? "plus" : "minus");

    transactionItem.innerHTML = `
    <li class="list-group-item">${transaction.source}<span class="float-right minus">${check}$${Math.abs(transaction.amount)}</span><a class="btn btn-danger btn-sm" onclick = removeTransaction(${transaction.id})>&times;</a></li>
    `
    list.appendChild(transactionItem)
}


// Initializing the App
function domLoad(){
    list.innerHTML = ''
    transactions.forEach(addTransactionsToDOM);
    updateDOM();
    updateLocalStorage()

}domLoad();

// Updating the values of income , balance and expense.
function updateDOM(){
    const getTotal = transactions.map(transaction => transaction.amount);

    const getIncome = getTotal.filter(item => item > 0)
                              .reduce((tot , item) => (tot += item),0)
                    
  
    const getExpense = getTotal.filter(item => item < 0)
                               .reduce((tot, item) => (tot += item),0)

    const getBalance = getIncome + getExpense

    total.innerHTML = `$${getBalance}`
    totalExpense.innerHTML = `$${getExpense}`
    totalIncome.innerHTML = `$${getIncome}`

    if(getBalance <= 0){
        total.style.color = "red"
    }else{
        total.style.color = "green"
    }
}

updateDOM();

// Adding the values from input
form.addEventListener("submit", addValuesToDOM)

function addValuesToDOM(e){
    e.preventDefault();

    if(source.value === "" || amountInput.value === ""){
        alert("Input is Blank!")
    }else{
        let transaction = {
            id : Math.random()*10,
            source : source.value,
            amount: +amountInput.value
        }

        transactions.push(transaction)
        updateDOM();
        addTransactionsToDOM(transaction)
        updateLocalStorage();

        source.value = " ";
        amountInput.value = ""
    }
}


// removing the items by clicking the delete button
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    updateLocalStorage();
  
    domLoad();
  }
  

removeTransaction()


// updating the localstorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}  