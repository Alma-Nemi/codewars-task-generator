/**
 * ID: 52449b062fb80683ec000024
 * @link: https://www.codewars.com/kata/52449b062fb80683ec000024
 * @date: 2025-07-28
 * @lvl: 5 kyu
 * @title: The Hashtag Generator
 * @description: The marketing team is spending way too much time typing in hashtags. Let's help them with our own Hashtag Generator! Here's the deal: - It must start with a hashtag (`#`). - All words must have their first letter capitalized. - If the final result is longer than 140 chars it must return `false`. - If the input or the result is an empty string it must return `false`. ## Examples ``` " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata" "    Hello     World   "                  =>  "#HelloWorld" ""                                        =>  false ```
 */

function generateHashtag (str) {
  const words = str.trim().split(/\s+/);
  if (words.length === 0 || words[0] === '') return false;

  const hashtag = '#' + words.map(word => word[0].toUpperCase() + word.slice(1)).join('');
  return hashtag.length > 140 ? false : hashtag; 
}
