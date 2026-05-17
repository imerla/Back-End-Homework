//Problem 1
let numArr=[1,2,3]

let newArr = numArr.map(num => num * 3);
console.log(newArr);

//Problem 2
function divisionOnThree(arr){
    return arr.filter(num => num % 3 === 0);
}

//მაგალითად:
console.log(divisionOnThree([1,2,3,4,5,6,7]));

//Problem 3
function possitiveSum(arr){
    let sum = 0;
    for (let num of arr) {
        if (num > 0) {
            sum += num;
        }
    }
    return sum;
}

//მაგალითად:
console.log(possitiveSum([-10,-4,-2,0,1,4,5,9]));

//Problem 4
let namesArr = ["giorgi","nika","mariami"]
let newNamesArr = namesArr.map(name => name.slice(0, -1));
console.log(newNamesArr);

//Problem 5
function filterByThree(arr){
    return arr.map(num => num * 2).filter(num => num % 3 === 0);
}

//მაგალითად:
console.log(filterByThree([1,2,3,4,5,6,7,8,9,10]));

//Problem 6
let numsArr = [1,-1,-2,-10,111,3,2,5]
console.log(numsArr.sort((a, b) => a - b));

//Problem 7
function moreThenFive(arr){
    return arr.map(num => num * 2).filter(num => num > 5);
}

//მაგალითად:
console.log(moreThenFive([-10,-5,-3,-1,0,4,5,6,9]));

//Problem 8
let arr = [1,1,1,1,2,2,3,3,3]
console.log([...new Set(arr)]);

//Problem 9
let nums = [-1,20,90,4,5,111]

function minSum(arr){
    let sorted = arr.sort((a, b) => a - b);
    return sorted[0] + sorted[1];
}

console.log(minSum(nums));



