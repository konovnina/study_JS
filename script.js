let money, income, addExpenses, deposit, mission, period;

// alert('Alert message');
// console.log('Console message');

//1
money = 50000;
income = "Фриланс";
addExpenses = "Кредит, Коммуналка, Еда, Здоровье, Развлечения, Непредвиденные расходы";
deposit = true;
mission = 100000;
period = 10;

//2
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit)
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);

let budgetDay = Math.round(money / 30);
console.log(budgetDay);