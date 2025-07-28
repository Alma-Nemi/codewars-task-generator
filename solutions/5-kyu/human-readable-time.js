/**
 * ID: 52685f7382004e774f0001f7
 * @link: https://www.codewars.com/kata/52685f7382004e774f0001f7
 * @date: 2025-07-28
 * @lvl: 5 kyu
 * @title: Human Readable Time
 * @description: Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (`HH:MM:SS`) * `HH` = hours, padded to 2 digits, range: 00 - 99 * `MM` = minutes, padded to 2 digits, range: 00 - 59 * `SS` = seconds, padded to 2 digits, range: 00 - 59 The maximum time never exceeds 359999 (`99:59:59`) You can find some examples in the test fixtures.
 */

function humanReadable (seconds) {
  const h = seconds / 3600 | 0;
  const m = (seconds / 60 | 0) % 60;
  const s = seconds % 60;

  return (h < 10 ? '0' : '') + h + ':' +
         (m < 10 ? '0' : '') + m + ':' +
         (s < 10 ? '0' : '') + s;
}
