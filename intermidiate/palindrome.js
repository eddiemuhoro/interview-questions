//Check if a String is a Palindrome:
// Write a function that takes a string as input and returns true if the string is a palindrome 
//(reads the same backward as forward), and false otherwise.

const string = 'hannawh'

const checkPalindrome = (string) => {
    let lastToStart = '';

    for(let i = string.length-1; i >=0; i--){
        lastToStart += string[i];
    }

    if (string == lastToStart){
        return true;
    }else {
        return false;
    }

}

console.log(checkPalindrome(string));