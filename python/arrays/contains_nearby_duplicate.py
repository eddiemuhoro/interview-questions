# Example: Check if the list contains duplicates within k distance
# Duplicates make this problem harder because you must track indices and check the distance between duplicates

def contains_nearby_duplicate(arr, k):
    seen = {}
    for i, num in enumerate(arr):
        if num in seen and i - seen[num] <= k:
            return True
        seen[num] = i
    return False

arr = [1, 2, 3, 1, 4, 5, 1]
k = 3
print('Contains nearby duplicate within', k, ':', contains_nearby_duplicate(arr, k))  # Output: True 