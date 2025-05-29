# Input: nums = [2,7,11,15], target = 9
# Output: [0,1]
# Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
nums = [3,2,4]
target = 6
output = []

def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(len(nums)):
            if(i != j):
                result = nums[i] + nums[j]
                if (result == target):
                    output.append(i)
                    output.append(j)
                    print(output)
                    return output
    
two_sum(nums, target)