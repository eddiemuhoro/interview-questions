//return sum of all arguments

function sumAll(...args){
    let sum = 0;
    for(let arg of args){
        sum += arg;
    }
    console.log(sum);
}

sumAll(3,5,4,3)