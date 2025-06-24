const paliName: string = "Hannah";

const checkPalindrome = (paliName: string): boolean => {
  const refinedString = paliName.toLowerCase();
  const initiArray = refinedString.split("").reverse().join("");
  if (refinedString === initiArray) {
    return true;
  }
  return false;
};

console.log(checkPalindrome(paliName));
