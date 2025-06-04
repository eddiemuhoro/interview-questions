nums1 = [4,9,5]
nums2 = [9,4,9,8,4]

def intersection(nums1, nums2):
    result = list(set(nums1) & set(nums2))
    return result

print(intersection(nums1, nums2))