//Find the Largest Number in an Array:
//Write a function that takes an array of numbers as input and returns the largest number in the array.

const array = [32, 42, 54, 23, 43, 56];
console.log("biggest No");
const largestNo = (array) => {
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    } else {
      max = max;
    }
  }
  return max;
};

console.log(largestNo(array));

function hey() {
  return "Hello";
}

hey();
