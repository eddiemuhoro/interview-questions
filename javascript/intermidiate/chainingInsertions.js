const originalString = '2839493';
const inserts = [{char: '(', index: 0}, {char: ')', index: 3}, {char: '-', index: 6}];

const newString = inserts
  .sort((a, b) => b.index - a.index) // Start from the end of the string
  .reduce((str, ins) => {
    return str.slice(0, ins.index) + ins.char + str.slice(ins.index);
  }, originalString);

console.log(newString); // Outputs: "Helloa Wborld"
console.log(originalString);