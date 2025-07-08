// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

let nums = [3, 2, 4];
let output = [];
const target = 6;

function getNums(nums, target) {
  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = 0; j < nums.length; j++) {
  //     if (i !== j) {
  //       let result = nums[i] + nums[j];
  //       console.log(result);
  //       if (target === result) {
  //         output.push(i, j);
  //         return output;
  //       }
  //     }
  //   }
  // }
  const numsMap = new Map();
  for (let j = 0; j < nums.length; j++) {
    const complement = target - nums[j];
    if (numsMap.has(complement)) {
      return [numsMap.get(complement), j];
    }
    numsMap.set(nums[j], j);
  }
  return [];
}
console.log(getNums(nums, target));
