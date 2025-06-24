def check_pal(s: str) -> bool:
    refined_str = s.lower()
    reversed_s = refined_str[::-1]
    if (reversed_s == refined_str):
        return True
    return False

print(check_pal('Hannah'))