'use strict';

//Получение данных
let money, income, addExpenses, deposit, mission, period;
money = +prompt('Ваш месячный доход: ', 50000);
income = "Фриланс";
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Кредит, Коммуналка, Еда');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов:', 'Коммунальные платежи');
let amount1 = +prompt('Во сколько это обойдется?', 10000);
let expenses2 = prompt('Введите обязательную статью расходов:', 'Еда');
let amount2 = +prompt('Во сколько это обойдется?', 10000);
mission = 100000;
period = 10;

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
let getExpensesMonth = function (expense1, expense2) {
  return expense1 + expense2;
};
 
console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));

//Функция расчета остатка, запись остатка в переменную
let getAccumulatedMonth = function (income, expenses) {
  return income - expenses;
};

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

//Функция расчета периода
let getTargetMonth = function (mission, accumulatedMonth) {
  return Math.round(mission / accumulatedMonth);
};

//За какой срок будет достигнута цель
period = getTargetMonth(mission, accumulatedMonth);
console.log('Цель будет достигнута за ', period, ' месяца(-ев)');


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

