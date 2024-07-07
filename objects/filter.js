const persons = [
    {
        id: 1,
        first: "Edwin",
        last: "Ken",
        age: 21,
        goals: 30
    },
    {
        id: 1,
        first: "Tony",
        last: "Muho",
        age: 27,
        goals: 30
    },
    {
        id: 1,
        first: "Tabby",
        last: "Wan",
        age: 21,
        goals: 30
    },
]

const result = persons.filter((person) => 
    person.age < 25
).map(person => person.first)

console.log(result);