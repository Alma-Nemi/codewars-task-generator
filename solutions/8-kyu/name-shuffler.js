/**
 * ID: 559ac78160f0be07c200005a
 * @link: https://www.codewars.com/kata/559ac78160f0be07c200005a
 * @date: 2025-07-28
 * @lvl: 8 kyu
 * @title: Name Shuffler
 * @description: Write a function that returns a string in which firstname is swapped with last name. **Example(Input --> Output)** ``` "john McClane" --> "McClane john" ``` RISC-V: The function signature is: ```c char *name_shuffler(char *shuffled, const char *name); ``` `name` is the input string and `shuffled` is the output buffer you should write to. You may assume the output buffer is large enough to hold the result. Return the output buffer.
 */

function nameShuffler(str){
  return str.split(' ').reverse().join(' ');
}
