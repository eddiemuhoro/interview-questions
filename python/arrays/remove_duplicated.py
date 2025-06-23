# Removes duplicates from a list and returns a new list with unique elements
# Time complexity: O(n), where n is the length of the input list

def remove_duplicates(nums):
    result = set(nums)  # O(n) to insert all elements into a set
    final = list(result)  # O(n) to convert set back to list
    return final  # O(1)

nums = [1, 1, 3, 3, 5, 6, 6]
print(remove_duplicates(nums))

# overall complexity = O(n) 