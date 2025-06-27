//word = 'cat'
//tiles = 'fcka' - 2+4= 5
//scores = {'a':2, 'c':3, r:'5', 't': 1, '_':0}

//caat
//tmoaa_ - > tmoa__
//3+2
let tiles = "mm__";
const word = "cat";
const points = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
  _: 0,
};
function wordScore(word, tiles) {
  let score = 0;
  const tileArray = tiles.split("");
  for (letter of word) {
    const index = tileArray.indexOf(letter);
    if (index !== -1) {
      score += points[letter];
      console.log(tileArray);
      tileArray.splice(index, 1);
    } else {
      if (tileArray.includes("_")) {
        const underscoreIndex = tileArray.indexOf("_");
        score += 1;
        tileArray.splice(underscoreIndex, 1);
      } else {
        return 0;
      }
    }
  }
  return score;
}

console.log(wordScore(word, tiles));
