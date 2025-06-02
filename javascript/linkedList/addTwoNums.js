// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
const l1 = [2, 4, 3];
const l2 = [5, 6, 4];

const addTwo = (l1, l2) => {
  const mod1 = Number(l1.reverse().join(""));
  const mod2 = Number(l2.reverse().join(""));
  const total = mod1 + mod2;
  const back = total
    .toString()
    .split("")
    .map((x) => Number(x));
  return back.reverse();
};

console.log(addTwo(l1, l2));
