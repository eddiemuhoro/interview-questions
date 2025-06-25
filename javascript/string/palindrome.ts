const paliName: string = "Han n,ah";

const checkPalindrome = (paliName: string): boolean => {
  let refinedString = paliName.toLowerCase();
  const regex = /[^a-z0-9]/g;
  refinedString = refinedString.replace(regex, "");
  console.log(refinedString);
  if (
    refinedString.split("").reverse().join("") ==
    paliName.toLocaleLowerCase().replace(regex, "")
  ) {
    return true;
  }
  return false;
};

console.log(checkPalindrome(paliName));
