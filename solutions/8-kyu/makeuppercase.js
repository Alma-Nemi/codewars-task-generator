/**
 * ID: 57a0556c7cb1f31ab3000ad7
 * @link: https://www.codewars.com/kata/57a0556c7cb1f31ab3000ad7
 * @date: 2025-07-28
 * @lvl: 8 kyu
 * @title: MakeUpperCase
 * @description: Write a function which converts the input string to uppercase. For BF all inputs end with \0, all inputs are lowercases and there is no space between. RISC-V: The function signature is ```c void to_upper_case(const char *str, char *out); ``` `str` is the input string. Write your result to `out`. You may assume it is large enough to hold the result. You do not need to return anything.
 */

function makeUpperCase(str) {
  return str.toUpperCase();
}
