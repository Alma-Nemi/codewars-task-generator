/**
 * ID: 546e2562b03326a88e000020
 * @link: https://www.codewars.com/kata/546e2562b03326a88e000020
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: Square Every Digit
 * @description: Welcome. In this kata, you are asked to square every digit of a number and concatenate them. For example, if we run 9119 through the function, 811181 will come out, because 9<sup>2</sup> is 81 and 1<sup>2</sup> is 1. (81-1-1-81) Example #2: An input of 765 will/should return 493625 because 7<sup>2</sup> is 49, 6<sup>2</sup> is 36, and 5<sup>2</sup> is 25. (49-36-25) **Note:** The function accepts an integer and returns an integer. Happy Coding!
 */

function squareDigits(num){
  return Number(num.toString().split('').map(x => x*x).join(''));
}
