// Problem 1
const fs = require('fs').promises;
const path = require('path');

async function problem1() {
  await fs.mkdir('folder1');
  await fs.mkdir('folder2');
  console.log('Created 2 folders: folder1, folder2');

  await fs.writeFile('file1.txt', 'Content of file1');
  await fs.writeFile('file2.txt', 'Content of file2');
  await fs.writeFile('file3.txt', 'Content of file3');
  console.log('Created 3 files: file1.txt, file2.txt, file3.txt');

  const stats1 = await fs.lstat('folder1');
  const stats2 = await fs.lstat('folder2');
  console.log('folder1 lstat:', stats1);
  console.log('folder2 lstat:', stats2);

  await fs.rmdir('folder1');
  await fs.rmdir('folder2');
  console.log('Deleted folders: folder1, folder2');
}

problem1();


// Problem 2
async function problem2() {
  await fs.mkdir('main', { recursive: true });
  console.log('Created main folder');

  const mainJsContent = `
const fs = require('fs').promises;
const path = require('path');

async function createSubfolderAndIndex() {
  await fs.mkdir('subfolder');
  console.log('Created subfolder');

  const indexJsContent = \`
const fs = require('fs').promises;
const path = require('path');

async function writeAndReverseMessage() {
  const message = 'Hello World';
  await fs.writeFile('../message.txt', message);
  console.log('Wrote message.txt');

  const content = await fs.readFile('../message.txt', 'utf8');
  
  const reversed = content.split('').reverse().join('');
  
  await fs.writeFile('../message.txt', reversed);
  console.log('Reversed string and wrote back to message.txt');
}

writeAndReverseMessage();
\`;
  
  await fs.writeFile('subfolder/index.js', indexJsContent);
  console.log('Wrote index.js in subfolder');
}

createSubfolderAndIndex();
`;

  await fs.writeFile('main/main.js', mainJsContent);
  console.log('Wrote main.js in main folder');

  const { spawn } = require('child_process');
  const mainProcess = spawn('node', ['main.js'], { cwd: 'main' });
  
  mainProcess.on('close', (code) => {
    console.log('main.js executed');
    
    const indexProcess = spawn('node', ['index.js'], { cwd: 'main/subfolder' });
    
    indexProcess.on('close', (code) => {
      console.log('index.js executed');
    });
  });
}

problem2();


// Problem 3
async function problem3() {
  await fs.mkdir('mixedFiles', { recursive: true });
  console.log('Created mixedFiles folder');

  await fs.writeFile('mixedFiles/file1.txt', 'file1.txt');
  await fs.writeFile('mixedFiles/file2.txt', 'file2.txt');
  await fs.writeFile('mixedFiles/file3.txt', 'file3.txt');

  await fs.writeFile('mixedFiles/script1.js', 'console.log("script1");');
  await fs.writeFile('mixedFiles/script2.js', 'console.log("script2");');
  await fs.writeFile('mixedFiles/script3.js', 'console.log("script3");');

  console.log('Created 6 files (3 .txt, 3 .js)');

  const files = await fs.readdir('mixedFiles');
  
  const txtFiles = files.filter(file => path.extname(file) === '.txt');
  console.log('Found .txt files:', txtFiles);

  let allContent = '';
  for (const file of txtFiles) {
    const content = await fs.readFile(`mixedFiles/${file}`, 'utf8');
    allContent += content + '\n';
  }

  await fs.writeFile('mixedFiles/all.txt', allContent);
  console.log('Wrote all .txt content to all.txt');
}

problem3();


// Problem 4
const http = require('http');

async function problem4() {
  const server = http.createServer((req, res) => {
    if (req.url === '/animals') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ animals: ['lion', 'tiger', 'elephant'] }));
    } else if (req.url === '/cars') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ cars: ['BMW', 'Mercedes', 'Toyota'] }));
    } else if (req.url === '/motorcycle') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ motorcycles: ['Harley Davidson', 'Yamaha', 'Honda'] }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

problem4();