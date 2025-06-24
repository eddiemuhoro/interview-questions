//reverse a atring
const string = "hello";

const reverseString = (string) => {
  let reversedString = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  console.log(reversedString);
};
