/**
 * @param {number[]} nums
 * @return {number}
 */
var nums = [1, 1, 3, 3, 5, 6, 6];
var removeDuplicates = function (nums) {
  const result = new Set(nums); //loop nums inserting in a set = O(n)
  const final = Array.from(result); //convert set back to array - iteration = O(n)

  return final; //no effect on time O(1)
};

console.log(removeDuplicates(nums));

//overall complexity = O(n)
