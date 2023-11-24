//Find the Largest Number in an Array: 
//Write a function that takes an array of numbers as input and returns the largest number in the array.

const array = [32,42,54,23,43];

const biggestNo = (array) => {
    let biggest=0;
    for(let i=0; i<array.length; i++){
       
        if(biggest < array[i]){
            biggest = array[i];
        }else{
            biggest = biggest;
        }
    }

    return biggest;
}
console.log(biggestNo(array));