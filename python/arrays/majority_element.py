# Example: Find the majority element in a list (appears more than n/2 times)
# Duplicates make this problem harder because you must count occurrences efficiently

def majority_element(arr):
    counts = {}
    threshold = len(arr) // 2
    for num in arr:
        counts[num] = counts.get(num, 0) + 1
        if counts[num] > threshold:
            return num
    return None  # No majority element

arr = [2, 2, 1, 2, 3, 2, 2]
print('Majority element:', majority_element(arr))  # Output: 2 