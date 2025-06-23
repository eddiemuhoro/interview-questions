# Example: Find the index of the first duplicate element in a list
# Duplicates make this problem harder because you must track seen elements and their indices

def first_duplicate_index(arr):
    seen = set()
    for index, num in enumerate(arr):
        if num in seen:
            return index
        seen.add(num)
    return -1

arr = [2, 4, 5, 3, 4, 2, 7]
print('Index of first duplicate:', first_duplicate_index(arr))  # Output: 4 (the second 4) 