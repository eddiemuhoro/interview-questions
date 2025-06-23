// Example: Find the index of the first duplicate element in an array
// Duplicates make this problem harder because you must track seen elements and their indices

function firstDuplicateIndex(arr) {
  const seen = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (seen.has(arr[i])) {
      return i; // Return the index of the first duplicate
    }
    seen.set(arr[i], i);
  }
  return -1; // No duplicates found
}

const arr = [2, 4, 5, 3, 4, 2, 7];
console.log("Index of first duplicate:", firstDuplicateIndex(arr)); // Output: 4 (the second 4)
