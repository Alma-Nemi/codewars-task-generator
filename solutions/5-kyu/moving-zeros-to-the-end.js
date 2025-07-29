/**
 * ID: 52597aa56021e91c93000cb0
 * @link: https://www.codewars.com/kata/52597aa56021e91c93000cb0
 * @date: 2025-07-29
 * @lvl: 5 kyu
 * @title: Moving Zeros To The End
 * @description: Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements. <pre><code>php moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]</code></pre> <pre><code>javascript moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]</code></pre> <pre><code>python move_zeros([1, 0, 1, 2, 0, 1, 3]) # returns [1, 1, 2, 1, 3, 0, 0]</code></pre> <pre><code>cpp move_zeros({1, 0, 1, 2, 0, 1, 3}) // returns {1, 1, 2, 1, 3, 0, 0}</code></pre> <pre><code>coffeescript moveZeros [false,1,0,1,2,0,1,3,"a"] # returns[false,1,1,2,1,3,"a",0,0]</code></pre> <pre><code>csharp Kata.MoveZeroes(new int[] {1, 2, 0, 1, 0, 1, 0, 3, 0, 1}) =&gt; new int[] {1, 2, 1, 1, 3, 1, 0, 0, 0, 0}</code></pre> <pre><code>go MoveZeros([]int{1, 2, 0, 1, 0, 1, 0, 3, 0, 1}) // returns []int{ 1, 2, 1, 1, 3, 1, 0, 0, 0, 0 }</code></pre> <pre><code>haskell moveZeros [1,2,0,1,0,1,0,3,0,1] -&gt; [1,2,1,1,3,1,0,0,0,0]</code></pre> <pre><code>factor { 1 2 0 1 0 1 0 3 0 1 } move-zeros -&gt; { 1 2 1 1 3 1 0 0 0 0 }</code></pre> <pre><code>ruby moveZeros [1,2,0,1,0,1,0,3,0,1] #-&gt; [1,2,1,1,3,1,0,0,0,0]</code></pre> <pre><code>c move_zeros(10, int [] {1, 2, 0, 1, 0, 1, 0, 3, 0, 1}); // -&gt; int [] {1, 2, 1, 1, 3, 1, 0, 0, 0, 0}</code></pre> <pre><code>scala moveZeroes(List(1, 0, 1, 2, 0, 1, 3)) // -&gt; List(1, 1, 2, 1, 3, 0, 0)</code></pre> <pre><code>bf "1012013\0"   --&gt;   "1121300"</code></pre>
 */

function moveZeros(arr) {
  const nonZeros = arr.filter(x => x !== 0);
  const zeros = arr.filter(x => x === 0);
  return [...nonZeros, ...zeros];
}