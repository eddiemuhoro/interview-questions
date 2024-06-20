//Check if a Number is Even or Odd: 
//Write a function that takes a number as input and returns "even"
// if the number is even, and "odd" if the number is odd.

const number = 34;

const detectNumberType = (number) => {
    if(number % 2 === 0){
        return "even"
    }else{
        return "Odd"
    }
}

console.log(detectNumberType(number))