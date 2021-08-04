'use strict';

//Проверка, является ли переменная числом
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Получение данных
let money, income, addExpenses, deposit, mission, period;
income = "Фриланс";
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Кредит, Коммуналка, Еда');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses = [];
mission = 100000;
period = 10;

let start = function () {
  do {
    money = prompt('Ваш месячный доход: ');
  } while (!isNumber(money));
}

start();

//Вывод в консоль типов данных
let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

//Преобразование и вывод обязательных расходов
addExpenses = addExpenses.toLowerCase().split(', ');
console.log('Обязательные расходы: ', addExpenses);

//Функция расчета суммы расходов
let getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов:');

    let temp;
    do {
      temp = prompt('Во сколько это обойдется?');
    } while (!isNumber(temp));

    sum += +temp;
  }
  console.log(expenses);
  return sum;
};
 
let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ', expensesAmount);

//Функция расчета остатка, запись остатка в переменную
let getAccumulatedMonth = function (income, expenses) {
  return income - expenses;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

//За какой срок будет достигнута цель
let getTargetMonth = function (mission, accumulatedMonth) {
  period = Math.ceil(mission / accumulatedMonth);
  if (period > 0) {
    console.log("Цель будет достигнута за " + period + " месяц(-а)");
  } else {
    console.log("Цель не будет достигнута");
  }
};

getTargetMonth(mission, accumulatedMonth);


//Расчет бюджета на день
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

//Расчет уровня дохода
let getStatusIncome = function (budgetDay) {
  if (budgetDay >= 1200) {
    return('У вас высокий уровень дохода');
  } else if ((budgetDay >= 600) && (budgetDay < 1200)) {
    return('У вас средний уровень дохода');
  } else if ((budgetDay >= 0) && (budgetDay < 600)) {
    return('К сожалению, у вас уровень дохода ниже среднего');  
  } else {
    return('Что-то полшло не так');
  }
};

console.log(getStatusIncome(budgetDay));

