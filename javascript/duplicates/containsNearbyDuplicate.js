// Example: Check if the array contains duplicates within k distance
// Duplicates make this problem harder because you must track indices and check the distance between duplicates

function containsNearbyDuplicate(arr, k) {
  const seen = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (seen.has(arr[i]) && i - seen.get(arr[i]) <= k) {
      return true;
    }
    seen.set(arr[i], i);
  }
  return false;
}

const arr = [1, 2, 3, 1, 4, 5, 1];
const k = 3;
console.log(
  "Contains nearby duplicate within",
  k,
  ":",
  containsNearbyDuplicate(arr, k)
); // Output: true
