//Check if a String is a Palindrome:
// Write a function that takes a string as input and returns true if the string is a palindrome 
//(reads the same backward as forward), and false otherwise.


String.prototype.checkPalindrome = function() {
    let lastToStart = '';

    for(let i = this.length-1; i >=0; i--){
        lastToStart += this[i];
    }

    if (this == lastToStart){
        return true;
    }else {
        return false;
    }

}


String.prototype.isPalindrome = function() {
    const array = this.split('').reverse().join('')
    console.log(array)
    if (array == this){
        return "Is palindrome"
    } else{
        return "Not palindrome"
    }
} 

console.log("hannah".isPalindrome())
console.log("hannahggnnh".isPalindrome())

console.log("hannajjh".checkPalindrome())