const users = [
    {
        id: 1,
        name: "Edwin",
        isActive: true,
    },
    {
        id: 2,
        name: "Mary",
        isActive: true,
    },
    {
        id: 3,
        name: "Carol",
        isActive: true,
    },
    {
        id: 4,
        name: "Felister",
        isActive: true,
    },
]
let valid = users.filter(user => user.isActive).sort((user1, user2) => user1.id < user2.id ? 1 : -1)

console.log(valid)