/**
 * ID: 57356c55867b9b7a60000bd7
 * @link: https://www.codewars.com/kata/57356c55867b9b7a60000bd7
 * @date: 2025-07-28
 * @lvl: 8 kyu
 * @title: Basic Mathematical Operations
 * @description: Your task is to create a function that does four basic mathematical operations. The function should take three arguments - operation(string/char), value1(number), value2(number). The function should return result of numbers after applying the chosen operation. ### Examples(Operator, value1, value2) --> output ``` ('+', 4, 7) --> 11 ('-', 15, 18) --> -3 ('*', 5, 5) --> 25 ('/', 49, 7) --> 7 ``` ```nasm mov dil, '+' mov rax, __float64__(4.0) mov rdx, __float64__(7.0) movq xmm0, rax movq xmm1, rdx call basic_op        ; XMM0 <- 11.0 mov dil, '-' mov rax, __float64__(15.0) mov rdx, __float64__(18.0) movq xmm0, rax movq xmm1, rdx call basic_op        ; XMM0 <- -3.0 mov dil, '*' mov rax, __float64__(5.0) movq xmm0, rax movq xmm1, rax call basic_op        ; XMM0 <- 25.0 mov dil, '/' mov rax, __float64__(49.0) mov rdx, __float64__(7.0) movq xmm0, rax movq xmm1, rdx call basic_op        ; XMM0 <- 7.0 ```
 */

function basicOp(operation, value1, value2){
  switch (operation) {
    case '+':
      return value1 + value2;
    case '-':
      return value1 - value2;
    case '*':
      return value1 * value2;
    case '/':
      return value1 / value2;
    default:
      throw new Error('Unknown operation');
  }
}
