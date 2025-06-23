// Demonstration of O(n) time complexity
// This function takes an array and returns the sum of its elements
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; // This loop runs n times, where n is arr.length
  }
  return sum;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
console.log("Sum:", sumArray(numbers)); // Output: Sum: 15

// The time taken by sumArray grows linearly with the size of the input array (O(n))
