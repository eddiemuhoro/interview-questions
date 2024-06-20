//Find the Most Frequent Element in an Array:
// Write a function that takes an array of elements as input and returns the element that appears the most frequently in the array.

function findElementWithFrequency(arr, targetFrequency) {
    const frequencyMap = {};
  
    arr.forEach(element => {
      frequencyMap[element] = (frequencyMap[element] || 0) + 1;
    });
  
    for (const [element, frequency] of Object.entries(frequencyMap)) {
      if (frequency === targetFrequency) {
        return parseInt(element); 
      }
    }
  
    return null;
  }
  
  const array = [1, 2, 3, 4, 5, 5, 5, 2, 2, 2, 3];
  const elementWithFrequency3 = findElementWithFrequency(array, 3);
  
  console.log('Element with frequency 3:', elementWithFrequency3);
  