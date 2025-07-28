/**
 * ID: 55908aad6620c066bc00002a
 * @link: https://www.codewars.com/kata/55908aad6620c066bc00002a
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: Exes and Ohs
 * @description: Check to see if a string has the same amount of 'x's and 'o's. The method must return a boolean and be case insensitive. The string can contain any char. Examples input/output: ``` XO("ooxx") => true XO("xooxx") => false XO("ooxXm") => true XO("zpzpzpp") => true // when no 'x' and 'o' is present should return true XO("zzoo") => false ```
 */

function XO(str) {
  let xCount = 0, oCount = 0;
  for (const char of str.toLowerCase()) {
    if (char === 'x') xCount++;
    else if (char === 'o') oCount++;
  }
  return xCount === oCount;
}
