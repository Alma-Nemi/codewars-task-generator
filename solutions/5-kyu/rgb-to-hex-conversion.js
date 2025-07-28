/**
 * ID: 513e08acc600c94f01000001
 * @link: https://www.codewars.com/kata/513e08acc600c94f01000001
 * @date: 2025-07-28
 * @lvl: 5 kyu
 * @title: RGB To Hex Conversion
 * @description: The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value. Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here. ### Examples (input --> output): ``` 255, 255, 255 --> "FFFFFF" 255, 255, 300 --> "FFFFFF" 0, 0, 0       --> "000000" 148, 0, 211   --> "9400D3" ```
 */

function rgb(r, g, b) {
  const clamp = val => Math.max(0, Math.min(255, val));
  const toHex = val => clamp(val).toString(16).padStart(2, '0').toUpperCase();
  
  return toHex(r) + toHex(g) + toHex(b);
}
