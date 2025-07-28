/**
 * ID: 5656b6906de340bd1b0000ac
 * @link: https://www.codewars.com/kata/5656b6906de340bd1b0000ac
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: Two to One
 * @description: Take 2 strings `s1` and `s2` including only letters from `a` to `z`. Return a new **sorted** string (alphabetical ascending), the longest possible, containing distinct letters - each taken only once - coming from s1 or s2. #### Examples: ``` a = "xyaabbbccccdefww" b = "xxxxyyyyabklmopq" longest(a, b) -> "abcdefklmopqwxy" a = "abcdefghijklmnopqrstuvwxyz" longest(a, a) -> "abcdefghijklmnopqrstuvwxyz" ```
 */

function longest(s1, s2) {
  return [...new Set(s1 + s2)].sort().join('');
}
