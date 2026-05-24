//Problem 1
function countdown(sec) {
    let currentSec = sec;

    const timer = setInterval(() => {
        console.log(currentSec);

        if (currentSec <= 0) {
            clearInterval(timer);
        }

        currentSec--;
    }, 1000);
}

countdown(5);

//Problem 2
function findMatchingRandom(target) {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * (target + 1));
        console.log("შემთხვევითი რიცხვი: " + randomNumber);
    } while (randomNumber !== target);

    console.log("დაემთხვა!");
}

findMatchingRandom(5);

//Problem 3
function checkNumber(n, callback) {
    if (n > 27) {
        callback();
    } else {
        console.log("n ნაკლებია 27-ზე");
    }
}

checkNumber(30, () => {
    console.log("n მეტია 27-ზე");
});

checkNumber(15, () => {
    console.log("n მეტია 27-ზე");
});

//Problem 4
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// 1. then/catch
function getUsersThen(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(users => users.slice(0, 4))
        .catch(error => console.error('Error:', error));
}

// 2. async/await
async function getUsersAsync(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();
        return users.slice(0, 4);
    } catch (error) {
        console.error('Error:', error);
    }
}

getUsersThen(API_URL).then(users => console.log('Then/Catch (4 users):', users));
getUsersAsync(API_URL).then(users => console.log('Async/Await (4 users):', users));

//Problem 5
let people = [
  { name: "Giorgi", age: 25 },
  { name: "Nika", age: 15 },
  { name: "Mariam", age: 30 },
  { name: "Luka", age: 18 }
];

const groupedPeople = people.reduce((acc, person) => {
    if (person.age > 10) {
        acc.over10.push(person);
    }
    if (person.age < 20) {
        acc.under20.push(person);
    }
    return acc;
}, { over10: [], under20: [] });

console.log(groupedPeople);

//Problem 6
function compareNumbers(num1, num2, callback) {
    if (num1 > num2) {
        callback();
    } else {
        console.log("ნაკლებია ან ტოლია");
    }
}

compareNumbers(10, 5, () => {
    console.log("მეტია");
});

compareNumbers(5, 10, () => {
    console.log("მეტია");
});

//Problem 7
let products = [
  { name: "Mouse", price: 15 },
  { name: "Keyboard", price: 45 },
  { name: "USB Cable", price: 7 },
  { name: "Headphones", price: 29.9 },
  { name: "Webcam", price: 52 }
];

const categorizedProducts = products.reduce((acc, product) => {
    if (product.price > 20) {
        acc.expensive.push(product);
    } else {
        acc.cheap.push(product);
    }
    return acc;
}, { expensive: [], cheap: [] });

console.log(categorizedProducts);
