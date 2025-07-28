/**
 * ID: 57eae20f5500ad98e50002c5
 * @link: https://www.codewars.com/kata/57eae20f5500ad98e50002c5
 * @date: 2025-07-28
 * @lvl: 8 kyu
 * @title: Remove String Spaces
 * @description: Write a function that removes the spaces from the string, then return the resultant string. Examples (**Input -> Output**): ``` "8 j 8   mBliB8g  imjB8B8  jl  B" -> "8j8mBliB8gimjB8B8jlB" "8 8 Bi fk8h B 8 BB8B B B  B888 c hl8 BhB fd" -> "88Bifk8hB8BB8BBBB888chl8BhBfd" "8aaaaa dddd r     " -> "8aaaaaddddr" ``` The input string will be terminated with a null character `\0`. For C and Nasm, you must return a new dynamically allocated string.
 */

function noSpace(x){
  return x.split(' ').join('');
}
