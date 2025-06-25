import re

def check_pal(s: str) -> bool:
    refined_str = ''.join(char.lower() for char in s if char.isalnum())
    reversed_s = refined_str[::-1]
    if (reversed_s == refined_str):
        return True
    return False

print(check_pal('Ha,nn ah'))