l1 = [2,4,3]
l2 = [5,6,4]

def add_two_nums(l1, l2):
    mod1 = int(''.join(map(str, l1[::-1])))
    mod2 = int(''.join(map(str, l2[::-1])))
    total = mod1 + mod2
    back = [int(x) for x in str(total)][::-1]
    return back
    

print(add_two_nums(l1, l2))