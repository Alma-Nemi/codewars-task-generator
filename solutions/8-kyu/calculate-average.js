/**
 * ID: 57a2013acf1fa5bfc4000921
 * @link: https://www.codewars.com/kata/57a2013acf1fa5bfc4000921
 * @date: 2025-07-28
 * @lvl: 8 kyu
 * @title: Calculate average
 * @description: Write a function which calculates the average of the numbers in a given array. **Note:** Empty arrays should return 0.
 */

function findAverage(array) {
  return array.length ? array.reduce((a, b) => a + b, 0) / array.length : 0;
}
