let person = {
    name: "Edwin",
    says: function (){
        console.log(`${this.name}, Hello World`);
    }
}

let child = {
    name: "Tony"
}

const res = person.says.bind(child)
 res();

//call => creating new context of the function

