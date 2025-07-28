/**
 * ID: 576757b1df89ecf5bd00073b
 * @link: https://www.codewars.com/kata/576757b1df89ecf5bd00073b
 * @date: 2025-07-28
 * @lvl: 6 kyu
 * @title: Build Tower
 * @description: Build Tower --- Build a pyramid-shaped tower, as an array/list of strings, given a positive integer `number of floors`. A tower block is represented with `"*"` character. For example, a tower with `3` floors looks like this: ``` [ "  *  ", " *** ", "*****" ] ``` And a tower with `6` floors looks like this: ``` [ "     *     ", "    ***    ", "   *****   ", "  *******  ", " ********* ", "***********" ] ``` ___ Go challenge [Build Tower Advanced](https://www.codewars.com/kata/57675f3dedc6f728ee000256) once you have finished this :)
 */

function towerBuilder(nFloors) {
  const tower = [];

  for (let i = 1; i <= nFloors; i++) {
    const stars = '*'.repeat(2 * i - 1);
    const spaces = ' '.repeat(nFloors - i);
    tower.push(spaces + stars + spaces);
  }

  return tower;
}
