// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

let nums = [2, 3, 7, 15];
let output = [];
const target = 9;

function getNums(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      const result = nums[i] + nums[j];
      if (target === result) {
        output.push(i, j);
        return output;
      }
    }

    return { error: "Error above" };
  }
}

console.log(getNums(nums, target));
