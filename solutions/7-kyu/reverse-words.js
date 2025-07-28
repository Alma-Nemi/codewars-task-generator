/**
 * ID: 5259b20d6021e9e14c0010d4
 * @link: https://www.codewars.com/kata/5259b20d6021e9e14c0010d4
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: Reverse words
 * @description: Complete the function that accepts a string parameter, and reverses each word in the string. **All** spaces in the string should be retained. ## Examples ``` "This is an example!" ==> "sihT si na !elpmaxe" "double  spaces"      ==> "elbuod  secaps" ```
 */

function reverseWords(str) {
  return str.split(' ').map(word => word.split('').reverse().join('')).join(' ');
}
