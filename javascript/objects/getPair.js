const persons = [
  {
    id: 1,
    first: "Edwin",
    last: "Ken",
    age: 21,
    goals: 30,
  },
  {
    id: 1,
    first: "Tony",
    last: "Muho",
    age: 27,
    goals: 30,
  },
  {
    id: 1,
    first: "Tabby",
    last: "Wan",
    age: 21,
    goals: 30,
  },
];

//object by first name
const statsByName = persons.reduce((acc, curr, index, array) => {
  acc[curr.first] = curr;

  return acc;
}, []);

console.log(statsByName);

const initials = persons.reduce((acc, curr, index, array) => {
  if (index === array.length) {
    return;
  } else {
    const split = curr.first[0];
    acc.push(`${curr.first[0]}${curr.last[0]}.`);
  }
  return acc;
}, []);

// console.log(initials);

//get a list of first

const result = persons.map((person) => person.first);
// console.log(result);

//no of same age [23: 2, 33:1]
const ageCount = persons.reduce((acc, curr) => {
  if (acc[curr.age]) {
    acc[curr.age]++;
  } else {
    acc[curr.age] = 1;
  }

  return acc;
}, {});

// console.log(ageCount);
