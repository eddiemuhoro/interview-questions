const paliName: string = "Han n,ah";

const checkPalindrome = (paliName: string): boolean => {
  let refinedString = paliName.toLowerCase();
  const regex = /[^a-z0-9]/g;
  refinedString = refinedString.replace(regex, "");
  console.log(refinedString);
  const initiArray = refinedString
    .replace(regex, "")
    .split("")
    .reverse()
    .join("");
  if (refinedString === initiArray) {
    return true;
  }
  return false;
};

console.log(checkPalindrome(paliName));
