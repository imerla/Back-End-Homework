//Problem 1
let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]];

let flatArr = arr.flat(Infinity);
console.log("Flattened array:", flatArr);

flatArr.sort((a, b) => a - b);
console.log("Sorted array:", flatArr);

let uniqueArr = [];
for (let i = 0; i < flatArr.length; i++) {
    let isUnique = true;
    for (let j = 0; j < uniqueArr.length; j++) {
        if (flatArr[i] === uniqueArr[j]) {
            isUnique = false;
            break;
        }
    }
    if (isUnique) {
        uniqueArr.push(flatArr[i]);
    }
}
console.log("Unique sorted array:", uniqueArr);


//Problem 2
let products = [
  { name:"Phone", price:1200, rating:4.5 },
  { name:"Laptop", price:2500, rating:4.8 },
  { name:"Book", price:30, rating:4.9 },
  { name:"TV", price:800, rating:4.0 }
];

let filteredProducts = [];
for (let i = 0; i < products.length; i++) {
    if (products[i].price < 1000) {
        filteredProducts.push(products[i]);
    }
}

let highestRatedProduct = filteredProducts[0];
for (let i = 1; i < filteredProducts.length; i++) {
    if (filteredProducts[i].rating > highestRatedProduct.rating) {
        highestRatedProduct = filteredProducts[i];
    }
}

console.log("Product with highest rating (price < 1000):", highestRatedProduct);


//Problem 3
let sentence = "dog cat dog bird cat dog fish bird";

let wordCounts = sentence.split(" ").reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
}, {});

console.log("Word counts:", wordCounts);

let mostRepeatedWord = "";
let maxCount = 0;

for (let word in wordCounts) {
    if (wordCounts[word] > maxCount) {
        maxCount = wordCounts[word];
        mostRepeatedWord = word;
    }
}

console.log("Most repeated word:", mostRepeatedWord, "appears", maxCount, "times");


//Problem 4
function countLetter(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) {
            count++;
        }
    }
    return count;
}

let testString = "hello world";
let testLetter = "l";
console.log(`Letter '${testLetter}' appears ${countLetter(testString, testLetter)} times in '${testString}'`);


//Problem 5
function isPalindrome(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return str === reversed;
}

console.log("Is 'ana' a palindrome?", isPalindrome("ana"));
console.log("Is 'abba' a palindrome?", isPalindrome("abba"));
console.log("Is 'gig' a palindrome?", isPalindrome("gig"));
console.log("Is 'hello' a palindrome?", isPalindrome("hello"));


//Problem 6
function mergeAndSum(arr1, arr2) {
    let merged = arr1.concat(arr2);

    let unique = [...new Set(merged)];
    
    let sum = unique.reduce((acc, num) => acc + num, 0);
    
    return { merged, unique, sum };
}

let array1 = [1, 2, 3, 4];
let array2 = [3, 4, 5, 6];
let result = mergeAndSum(array1, array2);

console.log("Array 1:", array1);
console.log("Array 2:", array2);
console.log("Merged array:", result.merged);
console.log("Unique array:", result.unique);
console.log("Sum of unique elements:", result.sum);


//Problem 7
function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log("Factorial of 5:", factorial(5));
console.log("Factorial of 0:", factorial(0));
console.log("Factorial of 7:", factorial(7));


//Problem 8
function twoSum(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

let twoSumArr = [1, 2, 3, 4, 5, 6, -7, -8];
let target = -15;
let twoSumResult = twoSum(twoSumArr, target);

console.log("Array:", twoSumArr);
console.log("Target sum:", target);
console.log("Indices of pair:", twoSumResult);