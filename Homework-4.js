//Problem 1
const laptops = [
  { model: "Dell XPS 13", price: 1800 },
  { model: "MacBook Pro 14", price: 2499 },
  { model: "Lenovo ThinkPad X1", price: 2100 },
  { model: "Asus Zephyrus G14", price: 1999 },
];

const mostExpensive = laptops.reduce((max, laptop) => laptop.price > max.price ? laptop : max);
console.log(mostExpensive);

//Problem 2
const rectangle = {
  width: 10,
  height: 5,
  getArea() {
    return this.width * this.height;
  }
};
console.log(rectangle.getArea());

//Problem 3
const students = [
  { name: "Giorgi", score: 85, passed: true },
  { name: "Nika", score: 50, passed: false },
  { name: "Mariam", score: 92, passed: true },
  { name: "Luka", score: 60, passed: false }
];

const passedStudents = students.filter(student => student.passed).map(student => student.name);
console.log(passedStudents);

//Problem 4
const products = [
  { title: "Pencil", price: 2 },
  { title: "Notebook", price: 5 },
  { title: "Backpack", price: 35 },
  { title: "Ruler", price: 3 },
  { title: "Calculator", price: 40 }
];

const cheapProducts = products.filter(product => product.price < 10).map(product => product.title);
console.log(cheapProducts);

//Problem 5
const movies = [
  { title: "Inception", rating: 9 },
  { title: "Avatar", rating: 7.5 },
  { title: "Joker", rating: 8.2 },
  { title: "Tenet", rating: 6.9 }
];

const sortedMovies = movies.sort((a, b) => a.rating - b.rating);
console.log(sortedMovies);

//Problem 6
const phones = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 }
];

const cheapestPhone = phones.reduce((min, phone) => phone.price < min.price ? phone : min);
console.log(cheapestPhone.model);

//Problem 7
const books = [
  { title: "Harry Potter", pages: 500 },
  { title: "The Little Prince", pages: 120 },
  { title: "Lord of the Rings", pages: 700 },
  { title: "Animal Farm", pages: 250 },
];

const longBooks = books.filter(book => book.pages > 300);
console.log(longBooks);

//Problem 8
const mobiles = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 }
];

const sortedPhones = mobiles.sort((a, b) => a.price - b.price);
console.log(sortedPhones);

const totalPrice = mobiles.reduce((sum, phone) => sum + phone.price, 0);
console.log(totalPrice);