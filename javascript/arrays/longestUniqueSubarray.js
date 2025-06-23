// Example: Find the length of the longest subarray with all unique elements
// Duplicates make this problem harder because you must track and skip over repeated elements efficiently

function longestUniqueSubarray(arr) {
  let maxLen = 0;
  let start = 0;
  const seen = new Map();

  for (let end = 0; end < arr.length; end++) {
    if (seen.has(arr[end]) && seen.get(arr[end]) >= start) {
      start = seen.get(arr[end]) + 1;
    }
    seen.set(arr[end], end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}

const arr = [1, 2, 3, 2, 4, 5, 3, 6];
console.log("Length of longest unique subarray:", longestUniqueSubarray(arr)); // Output: 5 ([2, 4, 5, 3, 6])
