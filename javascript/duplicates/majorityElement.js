// Example: Find the majority element in an array (appears more than n/2 times)
// Duplicates make this problem harder because you must count occurrences efficiently

function majorityElement(arr) {
  const counts = new Map();
  const threshold = Math.floor(arr.length / 2);
  for (let num of arr) {
    counts.set(num, (counts.get(num) || 0) + 1);
    if (counts.get(num) > threshold) {
      return num;
    }
  }
  return null; // No majority element
}

const arr = [2, 2, 1, 2, 3, 2, 2];
console.log("Majority element:", majorityElement(arr)); // Output: 2
