/**
 * ID: 5839edaa6754d6fec10000a2
 * @link: https://www.codewars.com/kata/5839edaa6754d6fec10000a2
 * @date: 2025-07-28
 * @lvl: 6 kyu
 * @title: Find the missing letter
 * @description: # Find the missing letter Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array. In the case of factor, your array of letters will be a string. You will always get an valid array. And it will be always exactly one letter be missing. The length of the array will always be at least 2.<br> The array will always contain letters in only one case. Example: ``` ['a','b','c','d','f'] -> 'e' ['O','Q','R','S'] -> 'P' ``` ```factor "abcdf" -> CHAR: e "OQRS" -> CHAR: P ``` ```if:swift ["a","b","c","d","f"] -> "e" ["O","Q","R","S"] -> "P" ``` (Use the English alphabet with 26 letters!) Have fun coding it and please don't forget to vote and rank this kata! :-) I have also created other katas. Take a look if you enjoyed this kata!
 */

function findMissingLetter(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i].charCodeAt(0) + 1 !== array[i + 1].charCodeAt(0)) {
            return String.fromCharCode(array[i].charCodeAt(0) + 1);
    }
  }
  return null;
}
