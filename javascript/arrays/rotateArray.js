let nums = [1, 2, 3, 4, 5, 6, 7];
let k = 3;

const rotateArray = (nums, k) => {
  k = k % nums.length; // Handle cases where k is greater than the length of the array
  const reverse = (arr, start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };

  reverse(nums, 0, nums.length - 1); // Reverse the entire array
  reverse(nums, 0, k - 1); // Reverse the first k elements
  reverse(nums, k, nums.length - 1); // Reverse the remaining elements
};
