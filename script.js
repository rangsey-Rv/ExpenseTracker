const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionList = document.getElementById('transactionList');
const form = document.getElementById('transactionForm');
const expenseBtn = document.getElementById('expenseBtn');
const incomeBtn = document.getElementById('incomeBtn');

let isIncome = false;
let transactions = [];

function updateTotals() {
  let income = 0, expense = 0;

  transactions.forEach(t => {
    if (t.type === 'income') {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  const total = income - expense;

  balanceEl.textContent = `$${total.toFixed(2)}`;
  incomeEl.textContent = `+$${income.toFixed(2)}`;
  expenseEl.textContent = `-$${expense.toFixed(2)}`;
}

function renderTransactions() {
  transactionList.innerHTML = '';
  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.className = `transaction-item ${transaction.type}`;
    li.innerHTML = `
      <div>
        ${transaction.name}<br>
        <small>${transaction.date}</small>
      </div>
      <div>
        <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${index})">×</button>
      </div>
    `;
    transactionList.appendChild(li);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateTotals();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;

  if (!name || isNaN(amount) || !date) {
    alert('Please fill in all fields');
    return;
  }

  const newTransaction = {
    name,
    amount,
    date,
    type: isIncome ? 'income' : 'expense',
  };

  transactions.push(newTransaction);
  renderTransactions();
  updateTotals();
  form.reset();
});

incomeBtn.addEventListener('click', () => {
  isIncome = true;
  incomeBtn.classList.add('active');
  expenseBtn.classList.remove('active');
});

expenseBtn.addEventListener('click', () => {
  isIncome = false;
  expenseBtn.classList.add('active');
  incomeBtn.classList.remove('active');
});
