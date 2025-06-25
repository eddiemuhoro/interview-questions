const s: string = "anagram";
const t: string = "nagaram";

const checkAnagram = (s: string, t: string): boolean => {
  if (s.length !== t.length) return false;
  const sortedS = s.split("").sort().join("");
  const sortedT = t.split("").sort().join("");

  if (sortedS === sortedT) {
    return true;
  }
  return false;
};

console.log(checkAnagram(s, t));
