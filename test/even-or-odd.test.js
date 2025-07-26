const { even_or_odd } = require('../8-kyu/even-or-odd');

describe('Sample tests', () => {
  test('case #1', () => {
    expect(evenOrOdd(2)).toBe("Even");
  });
  test('case #2', () => {
    expect(evenOrOdd(7)).toBe("Odd");
  });
  test('case #3', () => {
    expect(evenOrOdd(-42)).toBe("Even");
  });
  test('case #4', () => {
    expect(evenOrOdd(-7)).toBe("Odd");
  });
  test('case #5', () => {
    expect(evenOrOdd(0)).toBe("Even");
  });
});
