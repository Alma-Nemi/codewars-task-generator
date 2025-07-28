/**
 * ID: 51f2d1cafc9c0f745c00037d
 * @link: https://www.codewars.com/kata/51f2d1cafc9c0f745c00037d
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: String ends with?
 * @description: Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string). Examples: ```javascript solution('abc', 'bc') // returns true solution('abc', 'd') // returns false ``` ```coffeescript solution('abc', 'bc') # returns true solution('abc', 'd') # returns false ``` ```python solution('abc', 'bc') # returns true solution('abc', 'd') # returns false ``` ```go solution("abc", "bc") // returns true solution("abc", "d") // returns false ``` ```prolog solution("abc", "bc"). % match \+ solution("abc", "d"). % no match ``` ```clojure (solution "abc" "bc") ; returns true (solution "abc" "d'" ; returns false ``` ```lua strEndsWith('abc', 'bc') -- returns true strEndsWith('abc', 'd') -- returns false ``` ```cobol StringEndsWith('abc', 'bc') *     -->      result = 1 StringEndsWith('abc', 'd') *     -->      result = 0 ``` ```scala solution("abc", "bc") // returns true solution("abc", "d") //returns false ```
 */

function solution(str, ending){
  return str.endsWith(ending);
}
