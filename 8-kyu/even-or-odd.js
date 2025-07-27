/**
 * ID: 53da3dbb4a5168369a0000fe
 * @link https://www.codewars.com/kata/53da3dbb4a5168369a0000fe
 * @date 2025-07-27
 * @lvl: 8 kyu
 * @title: Even or Odd
 * @description: Create a function that takes an integer as an argument and returns `"Even"` for even numbers or `"Odd"` for odd numbers. You will be given a table `numbers`, with one column `number`.</br> Return a dataset with two columns: `number` and `is_even`, where `number` contains the original input value, and `is_even` containing `"Even"` or `"Odd"` depending on `number` column values. ### Numbers table schema ```text * number INT ``` ### Output table schema ```text * number  INT * is_even STRING ``` Write a script that takes an integer as an argument and returns `"Even"` for even numbers or `"Odd"` for odd numbers.
 */

function evenOrOdd(number) {
	return number % 2 === 0 ? "Even" : "Odd";
}
