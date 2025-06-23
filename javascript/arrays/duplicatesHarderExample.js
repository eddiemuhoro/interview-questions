// Example: Find all unique pairs in an array that sum to a target value
// Duplicates make this problem harder because we must avoid counting the same pair more than once

function uniquePairsWithSum(arr, target) {
  const seen = new Set();
  const output = new Set();

  for (let num of arr) {
    const complement = target - num;
    if (seen.has(complement)) {
      // Sort the pair to avoid (a,b) and (b,a) being counted separately
      const pair = [num, complement].sort((a, b) => a - b).toString();
      output.add(pair);
    }
    seen.add(num);
  }

  // Convert string pairs back to arrays
  return Array.from(output).map((pair) => pair.split(",").map(Number));
}

// Example with duplicates
const arr = [1, 2, 2, 3, 4, 3, 5];
const target = 4;
console.log(
  "Unique pairs that sum to",
  target,
  ":",
  uniquePairsWithSum(arr, target)
);

// Without handling duplicates, the same pair could be counted multiple times.
// Here, we use a Set to ensure each unique pair is only counted once.
