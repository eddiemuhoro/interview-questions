# Example: Find the length of the longest subarray with all unique elements
# Duplicates make this problem harder because you must track and skip over repeated elements efficiently

def longest_unique_subarray(arr):
    max_len = 0
    start = 0
    seen = {}
    for end, num in enumerate(arr):
        if num in seen and seen[num] >= start:
            start = seen[num] + 1
        seen[num] = end
        max_len = max(max_len, end - start + 1)
    return max_len

arr = [1, 2, 3, 2, 4, 5, 3, 6]
print('Length of longest unique subarray:', longest_unique_subarray(arr))  # Output: 5 ([2, 4, 5, 3, 6]) 