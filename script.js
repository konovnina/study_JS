let money, income, addExpenses, deposit, mission, period;

//Получение данных
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

//Вывод в консоль из предыдущего задания
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit)
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);

//Расчет бюджета на месяц
let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ', budgetMonth);

//За какой срок будет достигнута цель
period = Math.round(mission / budgetMonth);
console.log('Цель будет достигнута за ', period, ' месяца(-ев)');


//Расчет бюджета на день
let budgetDay = Math.floor(budgetMonth / 30);
console.log(budgetDay);

//Расчет уровня дохода
if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if ((budgetDay >= 600) && (budgetDay < 1200)) {
  console.log('У вас средний уровень дохода');
} else if ((budgetDay >= 0) && (budgetDay < 600)) {
  console.log('К сожалению, у вас уровень дохода ниже среднего');  
} else {
  console.log('Что-то полшло не так');
}