/**
 * @param {number[]} nums
 * @return {number}
 */
var nums = [1, 1, 3, 3, 5, 6, 6];
var removeDuplicates = function (nums) {
  const result = new Set(nums);
  const final = Array.from(result);

  return final;
};

console.log(removeDuplicates(nums));
