/**
 * ID: 54ba84be607a92aa900000f1
 * @link https://www.codewars.com/kata/54ba84be607a92aa900000f1
 * @date 2025-07-27
 * @lvl: 7 kyu
 * @title: Isograms
 * @description: An isogram is a word that has no repeating letters, consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case. **Example: (Input --> Output)** ``` "Dermatoglyphics" --> true "aba" --> false "moOse" --> false (ignore letter case) ``` ``` "Dermatoglyphics" -> t "aba" -> f "moOse" -> f (ignore letter case) ```
 */

function isIsogram(str) {
  return new Set(str.toLowerCase()).size === str.length;
}
