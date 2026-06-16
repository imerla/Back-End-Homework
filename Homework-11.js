// Problem 1
const fs = require('fs').promises;

async function calculateAndWriteSum() {
  const numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const sum = numbers.reduce((acc, num) => acc + num, 0);

  const result = { sum: sum };
  await fs.writeFile('sum.json', JSON.stringify(result, null, 2));
}

calculateAndWriteSum();


// Problem 2
async function reverseText() {
  const text = "Hello World";
  const reversed = text.split('').reverse().join('');
  
  const result = { original: text, reversed: reversed };
  await fs.writeFile('reversed.json', JSON.stringify(result, null, 2));
}

reverseText();


// Problem 3
async function writeUsersData() {
  const users = [
    { name: "Ana Alavidze", age: 30, email: "ana.alavidze@example.com" },
    { name: "Nini Kapanadze", age: 15, email: "nini.kapanadze@example.com" },
    { name: "Giorgi Giorgadze", age: 35, email: "giorgi.giorgadze@example.com" }
  ];
  
  await fs.writeFile('data.json', JSON.stringify(users, null, 2));
}

writeUsersData();


// Problem 4
async function combineFiles() {
  const sumData = JSON.parse(await fs.readFile('sum.json', 'utf8'));
  const reversedData = JSON.parse(await fs.readFile('reversed.json', 'utf8'));
  
  const combined = {
    sumData: sumData,
    reversedData: reversedData
  };
  
  await fs.writeFile('combined.json', JSON.stringify(combined, null, 2));
}

combineFiles();


// Problem 5
async function writeAndCountWords() {
  const text = "This is a sample text for counting words";
  
  await fs.writeFile('text.json', JSON.stringify({ text: text }, null, 2));
  
  const data = JSON.parse(await fs.readFile('text.json', 'utf8'));
  const wordCount = data.text.split(' ').length;
  
  const result = { text: data.text, wordCount: wordCount };
  await fs.writeFile('wordcount.json', JSON.stringify(result, null, 2));
}

writeAndCountWords();


// Problem 6
async function filterAdultUsers() {
  const users = JSON.parse(await fs.readFile('data.json', 'utf8'));
  
  const adultUsers = users.filter(user => user.age > 18);
  
  await fs.writeFile('filtered_data.json', JSON.stringify(adultUsers, null, 2));
}

filterAdultUsers();


// Problem 7
async function createAndFilterStudents() {
  const students = [
    { name: "Ana", score: 85, passed: true },
    { name: "Nini", score: 45, passed: false },
    { name: "Giorgi", score: 72, passed: true },
    { name: "Mariam", score: 38, passed: false },
    { name: "Luka", score: 91, passed: true }
  ];
  
  await fs.writeFile('students.json', JSON.stringify(students, null, 2));
  
  const allStudents = JSON.parse(await fs.readFile('students.json', 'utf8'));
  const passedStudents = allStudents.filter(student => student.score > 50);
  
  await fs.writeFile('passed.json', JSON.stringify(passedStudents, null, 2));
}

createAndFilterStudents();


// Problem 8
async function filterValidEmails() {
  const users = [
    { "name": "Gio", "email": "gio@gmail.com" },
    { "name": "Nika", "email": "nikaexample.com" },
    { "name": "Mariam", "email": "mariam@reeducate.ge" },
    { "name": "Lasha", "email": "lashareeducate.ge" },
    { "name": "Ana", "email": "ana@mail.com" }
  ];
  
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
  
  const allUsers = JSON.parse(await fs.readFile('users.json', 'utf8'));
  const validEmailUsers = allUsers.filter(user => user.email.includes('@'));
  
  await fs.writeFile('users.json', JSON.stringify(validEmailUsers, null, 2));
}

filterValidEmails();