'use strict';

const startButton = document.getElementById('start');
const cancelButton = document.getElementById('cancel');

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
    this.budget = +salaryAmount.value;
    this.getExpenses();  
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

    this.ready();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
  },
  reset: function () {
    const results = document.querySelectorAll('.result-total');
    results.forEach(function(item) {
      item.value = '';
    });

    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    const textInputs = document.querySelectorAll('.data input[type="text"]');
    textInputs.forEach(function(item) {
      item.removeAttribute('readonly');
      item.value = '';
      item.style.opacity = '1';
    });

    periodSelect.value = 1;
    periodAmount.textContent = 1;

    expensesItems.forEach(function(item, i) {
     if (i > 0) {
       item.remove();
     }
    });

    incomeItems.forEach(function(item, i) {
     if (i > 0) {
       item.remove();
     }
    });

    startButton.style.display = 'block';
    cancelButton.style.display = 'none';
  },
  ready: function () {
    const textInputs = document.querySelectorAll('.data input[type="text"]');
    textInputs.forEach(function(item) {
      item.readOnly = 'true';
      item.style.opacity = '0.5';
    });
    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
  },
  checkNumInput: function (e) {
    this.value = this.value.replace(/[^\d]/g, '');
    if (this === salaryAmount) {      
      if (this.value !== '') {
        startButton.removeAttribute('disabled');
        startButton.addEventListener('click', function () {
          appData.start.call(appData);
        });
      } else {
        console.log(this.value);
        startButton.setAttribute('disabled', true);
        startButton.removeEventListener('click', function () {
          appData.start.call(appData);
        });
      }
    }
  },
  checkWordInput: function (e) {
    this.value = this.value.replace(/[a-zA-Z\d]/g, '');
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
    this.incomeMonth = 0;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if ((itemIncome !== '') && (cashIncome !== '')) {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
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
    this.expensesMonth = 0;
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getAddExpenses: function () {
    this.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
     });
  },
  getAddIncome: function () {
    this.addIncome = [];
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '')  {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  calcSavedMoney: function () {
    return this.budgetMonth * this.period;
  },
  calcPeriod: function () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    return incomePeriodValue.value;
  },  
};

startButton.setAttribute('disabled', true);
addExpensesButton.addEventListener('click', appData.addExpensesBlock);
addIncomeButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.calcPeriod);

cancelButton.addEventListener('click', function () {
  appData.reset.call(appData);
});

document.querySelectorAll('input[placeholder="Сумма"]').forEach(function (item) {
  item.addEventListener('input', appData.checkNumInput);
});

document.querySelectorAll('input[placeholder="Наименование"], input[placeholder="название"]').forEach(function (item) {
  item.addEventListener('input', appData.checkWordInput);
});

