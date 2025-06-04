/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
let nums1 = [4, 9, 5];
let nums2 = [9, 4, 9, 8, 4];

var intersect = function (nums1, nums2) {
  let result = [];
  for (let i = 0; i < nums1.length; i++) {
    result = nums2.filter((x) => x !== nums1[i]);
  }
  return result;
};

console.log(intersect(nums1, nums2)); // Output: [2, 2]
