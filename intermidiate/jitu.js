// Design a function that reverses the digits of an integer. For example, 50
// should become 5 and -12 should become -21.

function reverseNumber(num) {
  const reversed = parseInt(num.toString().split("").reverse().join(""));
  return Math.sign(num) * reversed;
}

let num1 = -12;
console.log(reverseNumber(num1));

//Write a recursive function to calculate the factorial of a number

function factorial(n) {
  if (n < 0) {
    return "Invalid input";
  } else if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(4));

// Design a function that takes a string or sequence of characters as input and
// returns the character that appears most frequently.
//Eg 11189 => '1'
//hello => l

function geMostFrequent(string) {
  let maxCount = 0;
  let char = "";
  let stringArray = string.split("");
  stringArray.forEach((character) => {
    let count = stringArray.filter((c) => c === character).length;
    if (count > maxCount) {
      maxCount = count;
      char = character;
    }
  });

  return char;
}

let string = "hello";
console.log(geMostFrequent(string));

// Design a function that determines whether a given string is a pangram. A
// pangram is a sentence or phrase containing every letter of the alphabet at
// least once. Punctuation and case are typically ignored. For example, the
// string "The quick brown fox jumps over the lazy dog" is a pangram, while
// "Hello, world!" is not.

function isPangram(alphabets, pangram) {
  const alphabetArray = alphabets.split("");
  const pangramArray = pangram.split("");
  const isPan = true;
  alphabetArray.forEach((alphabet) => {
    if (!pangramArray.includes(alphabet)) {
      isPan = false;
    }
  });

  return isPan;
}
let pangram = "The quick brown fox jumps over the lazy dog";
let alphabets = "abcdefghijklmnopqrstuvwxyz";
console.log(isPangram(alphabets, pangram));

// Design a function that takes a list of integers as input. The function should
// return True if the list contains two consecutive threes (3 next to a 3) anywhere
// within the list. Otherwise, it should return False. For example, the function
// should return True for [1, 3, 3] and False for [1, 3, 1, 3].

function checkConsecutiveThrees(list) {
  for (i = 0; i < list.length; i++) {
    if (list[i] === 3 && list[i + 1] === 3) {
      return true;
    }
  }
  return false;
}

let list = [1, 3, 3];
let count = 0;
console.log(checkConsecutiveThrees(list));

// Master Yoda, a renowned Jedi Master from the Star Wars universe, is known
// for his unique way of speaking. He often reverses the order of words in his
// sentences. For example, instead of saying "I am home" he might say "Home
// am I" Design a function that takes a sentence as input and returns a new
// sentence with the words reversed in the same order that Master Yoda would
// use.

function reverseWords(sentence){
    const sentenceArray = sentence.split(' ').reverse()
    const reversedSentence = sentenceArray.join(' ')
    return reversedSentence
}

let sentence = "I am home";
console.log(reverseWords(sentence))
