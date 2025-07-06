const s = "carrace";
const t = "racccar";

function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const charCount = {};

  //add counts to object
  for (char of t) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (char of s) {
    if (!charCount[char] || charCount[char] === 0) return false;

    charCount[char]--;
  }

  return true;
}

console.log(isAnagram(s, t)); // Output: true
