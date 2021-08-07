'use strict';

//Новая функция на замену isNumber, которая проверяет числовые и текстовые данные
let checkType = function (data, type) {
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
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (!checkType(itemIncome, 'str'));
      console.log(itemIncome);
      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
      } while (!checkType(cashIncome, 'num'));
      appData.income[itemIncome] = cashIncome; 
    }

    let addExpenses;
    do {
      addExpenses = prompt('Перечислите возможные расходы за месяц через запятую:', 'Кредит, Коммуналка, Еда');
    } while (!checkType(addExpenses, 'str'));

    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function () {
    for (let i = 0; i < 2; i++) {
      let itemExpenses;
      do {
        itemExpenses = prompt(`Введите статью обязательных расходов №${i + 1}:`);
      } while (!checkType(itemExpenses, 'str'));
      appData.expenses[itemExpenses] = 0;
    }
    for (let key in appData.expenses) {
      let n;
      do {
        n = prompt(`${key} - во сколько это обойдется?`);
      } while (!checkType(n, 'num'));
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

  getInfoDeposit: function () {
    if (appData.deposit) {
      let itemPercentDeposit;
      do {
        itemPercentDeposit = prompt('Какой годовой процент?', 10);
      } while (!checkType(itemPercentDeposit, 'num'));
      appData.percentDeposit = itemPercentDeposit;

      let itemMoneyDeposit;
      do {
        itemMoneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!checkType(itemMoneyDeposit, 'num'));
      appData.moneyDeposit = itemMoneyDeposit;
    }
  },
  
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
  
};

let money;

let start = function () {
  do {
    money = prompt('Ваш месячный доход: ', 40000);
  } while (!checkType(money, 'num'));

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

};

start();