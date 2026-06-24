// Problem 1
const fs = require('fs');
const path = require('path');

const utilsDir = path.join(__dirname, 'utils');

if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir);
}

const helperContent = `function capitalize(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function testCapitalize() {
    console.log(capitalize('hello'));
    console.log(capitalize('world'));
    console.log(capitalize(''));
    console.log(capitalize(123));
}

module.exports = {
    capitalize,
    testCapitalize
};`;

fs.writeFileSync(path.join(utilsDir, 'helper.js'), helperContent);

const { testCapitalize } = require('./utils/helper');
testCapitalize();


// Problem 2
const palindromeContent = `function isPalindrome(str) {
    if (!str || typeof str !== 'string') {
        return false;
    }
    const lower = str.toLowerCase();
    return lower === lower.split('').reverse().join('');
}

function testPalindrome() {
    console.log(isPalindrome('racecar'));
    console.log(isPalindrome('hello'));
    console.log(isPalindrome('madam'));
    console.log(isPalindrome(''));
    console.log(isPalindrome(123));
}

module.exports = {
    isPalindrome,
    testPalindrome
};`;

fs.writeFileSync(path.join(utilsDir, 'palindrome.js'), palindromeContent);

const { testPalindrome } = require('./utils/palindrome');
testPalindrome();


// Problem 3
const longestWordContent = `function findLongestWord(sentence) {
    if (!sentence || typeof sentence !== 'string') {
        return '';
    }
    const words = sentence.split(' ');
    let longest = '';
    for (const word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }
    return longest;
}

function testLongestWord() {
    console.log(findLongestWord('I love JavaScript very much'));
}

module.exports = {
    findLongestWord,
    testLongestWord
};`;

fs.writeFileSync(path.join(utilsDir, 'longestWord.js'), longestWordContent);

const { testLongestWord } = require('./utils/longestWord');
testLongestWord();


// Problem 4
const serverContent = `const http = require('http');
const url = require('url');

const users = [
    { id: 1, name: 'Giorgi Imerlishvili', email: 'giorgi@example.com' },
    { id: 2, name: 'Nino Jorjoliani', email: 'nino@example.com' },
    { id: 3, name: 'Saba Kandelaki', email: 'saba@example.com' },
    { id: 4, name: 'Lasha Kapanadze', email: 'lasha@example.com' },
    { id: 5, name: 'Giorgi Lomidze', email: 'giorgi2@example.com' },
];

const posts = [
    { id: 1, title: 'First Post', content: 'This is my first post' },
    { id: 2, title: 'Second Post', content: 'This is my second post' },
    { id: 3, title: 'Third Post', content: 'This is my third post' },
    { id: 4, title: 'Fourth Post', content: 'This is my fourth post' },
    { id: 5, title: 'Fifth Post', content: 'This is my fifth post' },
];

function paginate(data, page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    res.setHeader('Content-Type', 'application/json');

    if (pathname === '/') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Welcome to the API' }));
    } else if (pathname === '/users') {
        let result = users;
        
        if (query.id) {
            result = result.filter(user => user.id === parseInt(query.id));
        }
        
        if (query.name) {
            result = result.filter(user => 
                user.name.toLowerCase().includes(query.name.toLowerCase())
            );
        }
        
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        result = paginate(result, page, limit);
        
        res.writeHead(200);
        res.end(JSON.stringify(result));
    } else if (pathname === '/posts') {
        let result = posts;
        
        if (query.id) {
            result = result.filter(post => post.id === parseInt(query.id));
        }
        
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        result = paginate(result, page, limit);
        
        res.writeHead(200);
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

function startServer(port = 3000) {
    server.listen(port, () => {
        console.log(\`Server running on http://localhost:\${port}\`);
    });
}

module.exports = {
    startServer
};`;

fs.writeFileSync(path.join(utilsDir, 'server.js'), serverContent);

const { startServer } = require('./utils/server');
startServer();


// Problem 5
const cliContent = `const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'products.json');

function loadProducts() {
    if (!fs.existsSync(productsFile)) {
        return [];
    }
    const data = fs.readFileSync(productsFile, 'utf8');
    return JSON.parse(data);
}

function saveProducts(products) {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

function isExpired(dateString) {
    const productDate = new Date(dateString);
    const today = new Date();
    return productDate < today;
}

function addProduct(name, description, date, category) {
    const products = loadProducts();
    const newProduct = {
        id: products.length + 1,
        name,
        description,
        date,
        category,
        expired: isExpired(date)
    };
    products.push(newProduct);
    saveProducts(products);
    console.log('Product added:', newProduct);
}

function readProducts() {
    const products = loadProducts();
    console.log('All products:', JSON.stringify(products, null, 2));
}

function readProductById(id) {
    const products = loadProducts();
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        console.log('Product found:', product);
    } else {
        console.log('Product not found');
    }
}

function deleteProduct(id) {
    let products = loadProducts();
    const initialLength = products.length;
    products = products.filter(p => p.id !== parseInt(id));
    if (products.length < initialLength) {
        saveProducts(products);
        console.log('Product deleted');
    } else {
        console.log('Product not found');
    }
}

function updateProduct(id, name, description, date, category) {
    const products = loadProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        products[index] = {
            ...products[index],
            name: name || products[index].name,
            description: description || products[index].description,
            date: date || products[index].date,
            category: category || products[index].category,
            expired: date ? isExpired(date) : products[index].expired
        };
        saveProducts(products);
        console.log('Product updated:', products[index]);
    } else {
        console.log('Product not found');
    }
}

function checkExpired() {
    const products = loadProducts();
    const expiredProducts = products.filter(p => p.expired);
    console.log('Expired products:', JSON.stringify(expiredProducts, null, 2));
}

function runCLI() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add':
            addProduct(args[1], args[2], args[3], args[4]);
            break;
        case 'read':
            if (args[1]) {
                readProductById(args[1]);
            } else {
                readProducts();
            }
            break;
        case 'delete':
            deleteProduct(args[1]);
            break;
        case 'update':
            updateProduct(args[1], args[2], args[3], args[4], args[5]);
            break;
        case '--isexpire':
            checkExpired();
            break;
        default:
            console.log('Usage:');
            console.log('  add <name> <description> <date> <category>');
            console.log('  read [id]');
            console.log('  delete <id>');
            console.log('  update <id> [name] [description] [date] [category]');
            console.log('  --isexpire');
    }
}

module.exports = {
    runCLI
};`;

fs.writeFileSync(path.join(utilsDir, 'products-cli.js'), cliContent);

const { runCLI } = require('./utils/products-cli');
runCLI();
