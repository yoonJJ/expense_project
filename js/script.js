const budgetInput = document.getElementById('budget-input');
const setBudgetBtn = document.getElementById('set-budget');
const remainingDisplay = document.getElementById('remaining');
const totalDisplay = document.getElementById('total');
const overBudgetWarning = document.getElementById('over-budget');

const expenseForm = document.getElementById('expense-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');

const budgetSection = document.getElementById('budget-section');
const statusSection = document.getElementById('status-section');
const expenseSection = document.getElementById('expense-section');

const editBudgetInput = document.getElementById('edit-budget');
const updateBudgetBtn = document.getElementById('update-budget');
const resetBtn = document.getElementById('reset-budget');

let budget = Number(localStorage.getItem('budget')) || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function save() {
  localStorage.setItem('budget', budget);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateDisplay() {
  let total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  let remaining = budget - total;

  totalDisplay.textContent = total.toLocaleString() + '원';
  remainingDisplay.textContent = remaining.toLocaleString() + '원';

  overBudgetWarning.style.display = remaining < 0 ? 'block' : 'none';
}

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((e, index) => {
    const li = document.createElement('li');
    li.textContent = `${e.desc} - ${Number(e.amount).toLocaleString()}원`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '삭제';
    delBtn.onclick = () => {
      expenses.splice(index, 1);
      save();
      updateDisplay();
      renderExpenses();
    };

    li.appendChild(delBtn);
    expenseList.appendChild(li);
  });
}

setBudgetBtn.onclick = () => {
  const inputVal = Number(budgetInput.value);
  if (inputVal > 0) {
    budget = inputVal;
    save();
    budgetSection.style.display = 'none';
    statusSection.style.display = 'block';
    expenseSection.style.display = 'block';
    updateDisplay();
  }
};

updateBudgetBtn.onclick = () => {
  const newBudget = Number(editBudgetInput.value);
  if (newBudget > 0) {
    budget = newBudget;
    save();
    updateDisplay();
    alert('예산이 수정되었습니다.');
    editBudgetInput.value = '';
  }
};

resetBtn.onclick = () => {
  if (confirm("예산과 지출 내역을 모두 초기화할까요?")) {
    localStorage.removeItem('budget');
    localStorage.removeItem('expenses');
    location.reload();
  }
};

expenseForm.onsubmit = (e) => {
  e.preventDefault();
  const desc = descInput.value.trim();
  const amount = Number(amountInput.value);

  if (!desc || !amount || amount <= 0) return;

  expenses.push({ desc, amount });
  save();
  descInput.value = '';
  amountInput.value = '';
  updateDisplay();
  renderExpenses();
};

if (budget > 0) {
  budgetSection.style.display = 'none';
  statusSection.style.display = 'block';
  expenseSection.style.display = 'block';
  updateDisplay();
  renderExpenses();
}

// ✅ 목적지 버튼 클릭 시 T map 연동
function openTMap(destination) {
  const encoded = encodeURIComponent(destination);
  const tmapUrl = `tmap://search?name=${encoded}`;
  window.location.href = tmapUrl;
}
