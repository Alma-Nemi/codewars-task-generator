/**
 * ID: 54ff3102c1bad923760001f3
 * @link: https://www.codewars.com/kata/54ff3102c1bad923760001f3
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: Vowel Count
 * @description: Return the number (count) of vowels in the given string. We will consider `a`, `e`, `i`, `o`, `u` as vowels for this Kata (but not `y`). The input string will only consist of lower case letters and/or spaces.
 */

function getCount(str) {
  return str.match(/[aeiou]/ig) ? str.match(/[aeiou]/ig).length : 0;
}
