/**
 * ID: 57eadb7ecd143f4c9c0000a3
 * @link: https://www.codewars.com/kata/57eadb7ecd143f4c9c0000a3
 * @date: 2025-07-28
 * @lvl: 8 kyu
 * @title: Abbreviate a Two Word Name
 * @description: Write a function to convert a name into initials. This kata strictly takes two words with one space in between them. The output should be two capital letters with a dot separating them. It should look like this: `Sam Harris` => `S.H` `patrick feeney` => `P.F` RISC-V: The function signature is: ```c char *get_initials(const char *full_name, char initials[4]); ``` Write your result to `initials`, and return that buffer.
 */

function abbrevName(name){
  return name.split(' ').map(item => item[0].toUpperCase()).join('.');
}
