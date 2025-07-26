/**
 * ID: 53da3dbb4a5168369a0000fe
 * @link https://www.codewars.com/kata/53da3dbb4a5168369a0000fe
 * @date 2025-07-26
 * @lvl: 8 kyu
 * @lvl.ru: 8 кю
 * @title: Even or Odd
 * @title.ru: Даже или странно
 * @description: ~~~if-not:sql,shell
 *   Create a function that takes an integer as an argument and returns `"Even"` for even numbers or `"Odd"` for odd numbers.
 *   ~~~
 *   
 *   ~~~if:sql
 *   You will be given a table `numbers`, with one column `number`.</br>
 *   
 *   Return a dataset with two columns: `number` and `is_even`, where `number` contains the original input value, and `is_even` containing `"Even"` or `"Odd"` depending on `number` column values.
 *   
 *   ### Numbers table schema
 *   
 *   ```text
 *   * number INT
 *   ```
 *   
 *   ### Output table schema
 *   
 *   ```text
 *   * number  INT
 *   * is_even STRING
 *   ```
 *   ~~~
 *   
 *   ~~~if:shell
 *   Write a script that takes an integer as an argument and returns `"Even"` for even numbers or `"Odd"` for odd numbers.
 *   ~~~
 * @description.ru: ~~~ if-not: SQL, Shell
 *   Создайте функцию, которая принимает целое число в качестве аргумента, и возвращает «даже» `для четных чисел или« нечетных »для нечетных чисел.
 *   ~~~
 *   
 *   ~~~ if: sql
 *   Вам будет предоставлена таблица `Numbers`, с одним столбцом` number`. </br>
 *   
 *   Верните набор данных с двумя столбцами: `number` и` is_even`, где `number` содержит исходное входное значение и` is_even`, содержащее `" даже "или` "add" `в зависимости от значений столбца` number`.
 *   
 *   ### Схема таблицы номеров
 *   
 *   `` `Текст
 *   * номер инт
 *   `` `
 *   
 *   ### Схема таблицы вывода
 *   
 *   `` `Текст
 *   * номер инт
 *   * is_even String
 *   `` `
 *   ~~~
 *   
 *   ~~~ if: Shell
 *   Напишите сценарий, который принимает целое число в качестве аргумента, и возвращает «даже» `для четных чисел или« нечетных »для нечетных чисел.
 *   ~~~
 */

function evenOrOdd(number) {
	return number % 2 === 0 ? "Even" : "Odd";
}

// Sample tests
const sampleTestsRaw = `
const chai = require('chai');
const assert = chai.assert;

describe("Sample tests",() => {
  
  it("2 is even", () => {
    assert.strictEqual(evenOrOdd(2), "Even");
  });
  it("7 is odd", () => {
    assert.strictEqual(evenOrOdd(7), "Odd");
  });
  it("-42 is even", () => {
    assert.strictEqual(evenOrOdd(-42), "Even");
  });
  it("-7 is odd", () => {
    assert.strictEqual(evenOrOdd(-7), "Odd");
  });
  it("0 is even", () => {
    assert.strictEqual(evenOrOdd(0), "Even");
  });
});
`;

module.exports = {
  even_or_odd,
  sampleTestsRaw
};