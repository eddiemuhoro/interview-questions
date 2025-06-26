//setup() -> takes an array of strings
//isInDictionary() -> checks if a string is in the dictionary
const word: string = "*at";
const arr: string[] = ["cat", "bat"];
const regex = /\*/g;

const setup = (arr: string[]): boolean => {
  const dic = new Set(arr);
  const isInDictionary = (word: string): boolean => {
    if (!word.includes("*")) {
      return arr.includes(word);
    }
    for (let str of arr) {
      const refStr = str.split(""); //['c', 'a', 't']
      const refinedWord = word.split(""); //['*', 'a', 't']
      for (let i = 0; i < refinedWord.length; i++) {
        if (refinedWord[i] !== "*" && refinedWord[i] !== refStr[i]) {
          return false;
        }
        return true;
      }
    }
    return dic.has(word);
  };

  return isInDictionary(word);
};

console.log(setup(arr));

//   const isInDictionary = (word: string): boolean => {
//     return dic.has(word);
//   };
