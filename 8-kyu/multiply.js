/**
 * ID: 50654ddff44f800200000004
 * @link https://www.codewars.com/kata/50654ddff44f800200000004
 * @date 2025-07-26
 * @lvl: 8 kyu
 * @lvl.ru: 8 кю
 * @title: Multiply
 * @title.ru: Умножить
 * @description: This code does not execute properly. Try to figure out why.
 * @description.ru: Этот код не выполняется должным образом. Попробуйте выяснить, почему.
 */

function multiply(a, b) {
  return a * b;
}

// Sample tests
const sampleTestsRaw = `
const assert = require("chai").assert;

describe("Multiply", () => {
  it("fixed tests", () => {
    assert.strictEqual(multiply(1,1), 1);
    assert.strictEqual(multiply(2,1), 2);
    assert.strictEqual(multiply(2,2), 4);
    assert.strictEqual(multiply(3,5), 15); 
    assert.strictEqual(multiply(5,0), 0);
    assert.strictEqual(multiply(0,5), 0);
    assert.strictEqual(multiply(0,0), 0); 
  });
});
`;

module.exports = {
  multiply,
  sampleTestsRaw
};