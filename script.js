'use strict';

//Проверка, является ли переменная числом
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  period: 3,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за месяц через запятую:', 'Кредит, Коммуналка, Еда');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function () {
    for (let i = 0; i < 2; i++) {
      appData.expenses[prompt(`Введите статью обязательных расходов №${i+1}:`)] = 0;
    }
    for (let key in appData.expenses) {
      let n;
      do {
        n = prompt(`${key} - во сколько это обойдется?`);
      } while (!isNumber(n));
      appData.expenses[key] = +n;
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
};

let money;

let start = function () {
  do {
    money = prompt('Ваш месячный доход: ');
  } while (!isNumber(money));
  
  appData.budget = money;
  appData.asking();
  appData.getExpensesMonth();
  appData.getBudget();
  appData.getTargetMonth();

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
};

start();