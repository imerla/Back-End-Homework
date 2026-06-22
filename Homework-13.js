// Problem 1
const fs = require('fs').promises;

async function createHelper() {
  const helperContent = `const fs = require('fs').promises;

async function read(filePath, parseJson = false) {
  const content = await fs.readFile(filePath, 'utf8');
  if (parseJson) {
    return JSON.parse(content);
  }
  return content;
}

async function write(filePath, data) {
  let content = data;
  if (typeof data === 'object') {
    content = JSON.stringify(data, null, 2);
  }
  await fs.writeFile(filePath, content);
}

function calculateSum(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

module.exports = {
  read,
  write,
  calculateSum,
  reverseString
};`;

  await fs.mkdir('utils', { recursive: true });
  await fs.writeFile('utils/helper.js', helperContent);
  console.log('Created utils/helper.js');
}

async function problem1() {
  await createHelper();
  
  const { read, write, calculateSum, reverseString } = require('./utils/helper');

  const data1 = {
    name: 'Test File 1',
    numbers: [10, 20, 30, 40, 50],
    sum: calculateSum([10, 20, 30, 40, 50])
  };
  await write('file1.json', data1);
  console.log('Created file1.json');

  const text = 'Hello World';
  const reversed = reverseString(text);
  const data2 = {
    original: text,
    reversed: reversed
  };
  await write('file2.json', data2);
  console.log('Created file2.json');

  const file1Content = await read('file1.json', true);
  const file2Content = await read('file2.json', true);
  
  console.log('file1.json content:', file1Content);
  console.log('file2.json content:', file2Content);
}

problem1();


// Problem 2
const axios = require('axios');

async function problem2() {
  const api1 = 'https://jsonplaceholder.typicode.com/users';
  const api2 = 'https://jsonplaceholder.typicode.com/posts';

  console.log('Promise.all (simultaneous)');
  const promise1 = axios.get(api1);
  const promise2 = axios.get(api2);
  
  const [users, posts] = await Promise.all([promise1, promise2]);
  console.log('Users count:', users.data.length);
  console.log('Posts count:', posts.data.length);

  console.log('\nPromise.race (first to resolve)');
  const firstToResolve = await Promise.race([
    axios.get(api1),
    axios.get(api2)
  ]);
  console.log('First API to resolve:', firstToResolve.config.url);
  console.log('Data length:', firstToResolve.data.length);

  console.log('\nPromise.allSettled (resolve/reject status)');
  const results = await Promise.allSettled([
    axios.get(api1),
    axios.get(api2)
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`API ${index + 1}: RESOLVED - ${result.value.config.url}`);
      console.log(`Data length: ${result.value.data.length}`);
    } else {
      console.log(`API ${index + 1}: REJECTED - ${result.reason.message}`);
    }
  });
}

problem2();