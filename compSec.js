// Function to perform columnar transposition encryption
function encryptMessage(message, key) {
    // Remove spaces from the message and convert it to uppercase
    message = message.replace(/\s/g, '').toUpperCase();

    // Calculate the number of columns based on the length of the key
    const numColumns = key.length;

    // Calculate the number of rows needed to accommodate the message
    const numRows = Math.ceil(message.length / numColumns);

    // Create a 2D array to represent the grid for transposition
    const grid = new Array(numRows).fill(null).map(() => new Array(numColumns).fill(''));

    //Fill the grid with characters from the message
    let index = 0;
    for (let col = 0; col < numColumns; col++) {
        for (let row = 0; row < numRows; row++) {
            if (index < message.length) {
                grid[row][col] = message.charAt(index);
                index++;
            }
        }
    }

    // Create an array to store the encrypted columns
    const encryptedColumns = new Array(numColumns);

    // Arrange the columns based on the key order
    for (let i = 0; i < numColumns; i++) {
        const colIndex = key.indexOf(i + 1);
        encryptedColumns[i] = grid.map(row => row[colIndex]);
    }

    // Join the encrypted columns to get the final encrypted message
    const encryptedMessage = encryptedColumns.flat().join('');

    return encryptedMessage;
}

// Example usage
const messageToEncrypt = "Hello, World!";
const encryptionKey = [3, 1, 4, 2]; // Example key, you can change this

const encryptedMessage = encryptMessage(messageToEncrypt, encryptionKey);

console.log(`Original Message: ${messageToEncrypt}`);
console.log(`Encrypted Message: ${encryptedMessage}`);
