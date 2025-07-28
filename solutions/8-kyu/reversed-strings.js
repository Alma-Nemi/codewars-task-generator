/**
 * ID: 5168bb5dfe9a00b126000018
 * @link: https://www.codewars.com/kata/5168bb5dfe9a00b126000018
 * @date: 2025-07-28
 * @lvl: 8 kyu
 * @title: Reversed Strings
 * @description: Complete the solution so that it reverses the string passed into it. ``` 'world'  =>  'dlrow' 'word'   =>  'drow' ```
 */

function solution(str){
  return [...str].reverse().join('');
}
