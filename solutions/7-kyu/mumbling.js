/**
 * ID: 5667e8f4e3f572a8f2000039
 * @link: https://www.codewars.com/kata/5667e8f4e3f572a8f2000039
 * @date: 2025-07-28
 * @lvl: 7 kyu
 * @title: Mumbling
 * @description: This time no story, no theory. The examples below show you how to write function `accum`: #### Examples: ``` accum("abcd") -> "A-Bb-Ccc-Dddd" accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy" accum("cwAt") -> "C-Ww-Aaa-Tttt" ``` The parameter of accum is a string which includes only letters from `a..z` and `A..Z`.
 */

function accum(s) {
	return s.split('').map((c, i) => (c.toUpperCase() + c.toLowerCase().repeat(i))).join('-');
}
