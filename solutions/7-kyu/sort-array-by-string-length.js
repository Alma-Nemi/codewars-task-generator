/**
 * ID: 57ea5b0b75ae11d1e800006c
 * @link: https://www.codewars.com/kata/57ea5b0b75ae11d1e800006c
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: Sort array by string length
 * @description: Write a function that takes an array of strings as an argument and returns a sorted array containing the same strings, ordered from shortest to longest. For example, if this array were passed as an argument: ```javascript ["Telescopes", "Glasses", "Eyes", "Monocles"] ``` Your function would return the following array: ```javascript ["Eyes", "Glasses", "Monocles", "Telescopes"] ``` All of the strings in the array passed to your function will be different lengths, so you will not have to decide how to order multiple strings of the same length.
 */

function sortByLength (array) {
  return array.sort((a, b) => a.length - b.length);
}
