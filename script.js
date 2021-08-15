'use strict';

const startButton = document.getElementById('start');

const buttons = document.getElementsByTagName('button');
const addIncomeButton = buttons[0];
const addExpensesButton = buttons[1];

let depositCheckbox = document.querySelector('#deposit-check');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');

let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let salaryAmount = document.querySelector('.salary-amount');

let incomeTitle = document.querySelector('input.income-title');
let incomeItems = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');

let targetAmount = document.querySelector('.target-amount');

let periodAmount = document.querySelector('.period-amount');
let periodSelect = document.querySelector('.period-select');

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();  
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
  }, 
  checkNumInput: function (e) {
    e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, '');
    if (e.currentTarget === salaryAmount) {      
      if (e.currentTarget.value !== '') {
        console.log(e.currentTarget.value);
        startButton.removeAttribute('disabled');
        startButton.addEventListener('click', appData.start)
      } else {
        console.log(e.currentTarget.value);
        startButton.setAttribute('disabled', true);
        startButton.removeEventListener('click', appData.start)
      }
    }
  },
  checkWordInput: function (e) {
    e.currentTarget.value = e.currentTarget.value.replace(/[a-zA-Z\d]/g, '');
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if ((itemExpenses !== '') && (cashExpenses !== '')) {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    appData.incomeMonth = 0;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if ((itemIncome !== '') && (cashIncome !== '')) {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  addExpensesBlock: function () {    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(input => input.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesButton);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      addExpensesButton.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(input => input.value = '');
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeButton);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      addIncomeButton.style.display = 'none';
    }
  },
  getExpensesMonth: function () {
    appData.expensesMonth = 0;
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getAddExpenses: function () {
    appData.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
     });
  },
  getAddIncome: function () {
    appData.addIncome = [];
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
  calcPeriod: function () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
    return incomePeriodValue.value;
  },  
};

startButton.setAttribute('disabled', true);
addExpensesButton.addEventListener('click', appData.addExpensesBlock);
addIncomeButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.calcPeriod);

document.querySelectorAll('input[placeholder="Сумма"]').forEach(function (item) {
  item.addEventListener('input', appData.checkNumInput);
});

document.querySelectorAll('input[placeholder="Наименование"], input[placeholder="название"]').forEach(function (item) {
  item.addEventListener('input', appData.checkWordInput);
});

