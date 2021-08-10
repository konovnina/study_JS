'use strict';

//Получение данных из DOM-дерева
const startButton = document.getElementById('start');

const buttons = document.getElementsByTagName('button');
const addIncomeButton = buttons[0];
const addExpensesButton = buttons[1];

const depositCheckbox = document.querySelector('#deposit-check');

const additionalIncome = document.querySelectorAll('.additional_income-item');
const additionalExpenses = document.querySelector('.additional_expenses-item');

const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');

const salaryAmount = document.querySelector('.salary-amount');

const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('.income-amount');

const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');

const targetAmount = document.querySelector('.target-amount');

const periodSelect = document.querySelector('.period-select');


//Получение данных от пользователя
const getValue = function (message, type, callback) {
  let value;
  do {
    value = prompt(message);
  } while (!callback(value, type));
  return value;
};

//Проверка числовых и текстовых данных
const checkType = function (data, type) {
  if (type === 'num') {
    return (!isNaN(parseFloat(data)) && isFinite(data) && (data !== null) && (data !== undefined));
  }

  if (type === 'str') {
    return (isNaN(parseFloat(data)) && (data !== '') && (data !== null) && (data !== undefined));
  }
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  period: 3,
  asking: function () {

    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome = getValue('Какой у вас дополнительный заработок?', 'str', checkType);
      let cashIncome = getValue('Сколько в месяц зарабатываете на этом?', 'num', checkType);
      appData.income[itemIncome] = cashIncome; 
    }

    appData.addExpenses = getValue('Перечислите расходы за месяц через запятую:', 'str', checkType).split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function () {
    for (let i = 0; i < 2; i++) {
      let itemExpenses = getValue(`Введите статью обязательных расходов №${i + 1}:`, 'str', checkType);
      appData.expenses[itemExpenses] = 0;
    }
      for (let key in appData.expenses) {
        appData.expenses[key] = +getValue(`${key} - во сколько это обойдется?`, 'num', checkType);
        appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return('У вас высокий уровень дохода');
    } else if ((appData.budgetDay >= 600) && (appData.budgetDay < 1200)) {
      return('У вас средний уровень дохода');
    } else if ((appData.budgetDay >= 0) && (appData.budgetDay < 600)) {
      return('К сожалению, у вас уровень дохода ниже среднего');  
    } else {
      return('Что-то полшло не так');
    }
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = getValue('Какой годовой процент?', 'num', checkType);
      appData.moneyDeposit = getValue('Какая сумма заложена?', 'num', checkType);
    }
  },
  
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
  
};

let money;

const start = function () {
  money = getValue('Ваш месячный доход: ', 'num', checkType);
};

start();

appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();
appData.calcSavedMoney();
console.log(`Расходы за месяц: ${appData.expensesMonth}`);

if (appData.period > 0) {
  console.log("Цель будет достигнута за " + appData.period + " месяц(-а)");
} else {
  console.log("Цель не будет достигнута");
}

console.log(appData.getStatusIncome());

console.log('\nНаша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}

//Вывод массива addExpenses
let outputExpenses = [];
for (let key of appData.addExpenses) {
  outputExpenses.push(key[0].toUpperCase() + key.slice(1))
}
console.log(outputExpenses.join(', '));