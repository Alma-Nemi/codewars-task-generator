/**
 * ID: 5715eaedb436cf5606000381
 * @link: https://www.codewars.com/kata/5715eaedb436cf5606000381
 * @date: 2025-07-28
 * @lvl: 8 kyu
 * @title: Sum of positive
 * @description: ### Task You get an array of numbers, return the sum of all of the positives ones. ### Example - `[1, -4, 7, 12]` => `$ 1 + 7 + 12 = 20 $` ### Note If there is nothing to sum, the sum is default to `0`.
 */

function positiveSum(arr) {
  const positiveArr= arr.filter(item => item > 0);
  return positiveArr.reduce(function(a, b){
    return a + b;
}, 0);
}
