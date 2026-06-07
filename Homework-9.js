//Problem 1
function filterEvenAndFindAverage(arr) {
    const evenNumbers = arr.filter(num => num % 2 === 0);
    const sum = evenNumbers.reduce((acc, num) => acc + num, 0);
    const average = evenNumbers.length > 0 ? sum / evenNumbers.length : 0;
    return { evenNumbers, average };
}

console.log(filterEvenAndFindAverage([1, 2, 3, 4, 5, 6]));


//Problem 2
function countWords(sentence) {
    return sentence.split(' ').length;
}

let sentence = "I love JavaScript";
console.log(countWords(sentence));


//Problem 3
function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

//Test
console.log(isPrime(7));
console.log(isPrime(4));


//Problem 4
let words = ["dog", "elephant", "cat", "hippopotamus"];
function findLongestWord(wordArray) {
    return wordArray.reduce((longest, current) => 
        current.length > longest.length ? current : longest
    );
}

console.log(findLongestWord(words));


//Problem 5
let arr = [3, 5, 3, 2, 5, 5, 3, 5];
function findMostFrequent(array) {
    const frequency = {};
    let maxCount = 0;
    let mostFrequent = array[0];
    
    for (const num of array) {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxCount) {
            maxCount = frequency[num];
            mostFrequent = num;
        }
    }
    return mostFrequent;
}

console.log(findMostFrequent(arr));


//Problem 6
let nums = [1, 2, 3, 4, 5, 6, 7, 8];
function countEvenOdd(numbers) {
    let evenCount = 0;
    let oddCount = 0;
    
    for (const num of numbers) {
        if (num % 2 === 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }
    return { evenCount, oddCount };
}

console.log(countEvenOdd(nums));


//Problem 7
let nums2 = [10, 2, 33, 5, 7];
function findSmallest(numbers) {
    return Math.min(...numbers);
}

console.log(findSmallest(nums2));