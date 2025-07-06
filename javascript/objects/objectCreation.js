//define properties using strings
const person = {
  "first name": "Edwin",
  "last name": "Ken",
  age: 21,
  goals: 30,
};

person["full name with age"] = function () {
  return `${this["first name"]} ${this["last name"]} is ${this.age} years old`;
};
person.yob = 2000;
person["first name"] = (person["first name"] || 0) + 1; // Convert first name to uppercase

Object.assign(person, {
  "last name": "Doe",
  age: 22,
});
console.log(person, person["full name with age"]()); // Accessing property with space in the name

const updatedObj = Object.assign({}, person, {
  "first name": "John",
});

console.log(updatedObj["full name with age"]()); // { first name: 'John' }
