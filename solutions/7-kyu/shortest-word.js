/**
 * ID: 57cebe1dc6fdc20c57000ac9
 * @link: https://www.codewars.com/kata/57cebe1dc6fdc20c57000ac9
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: Shortest Word
 * @description: Simple, given a string of words, return the length of the shortest word(s). String will never be empty and you do not need to account for different data types.
 */

function findShort(s){
  return Math.min(...s.split(" ").map (s => s.length));
}
