s = 'anagrad'
t = 'nagaram'

def check_anagram(s,t):
    if (len(s) != len(s)): # s.length equivalent in js
        return False
    return (sorted(s) == sorted(t)) #s.sort() equivalent in js
    

print(check_anagram(s,t))