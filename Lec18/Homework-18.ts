// Problem 2
function getUserInfo(name: string, age: number): string {
  return `User ${name} is ${age} years old.`;
}

// Test
console.log(getUserInfo('Nika', 22));


// Problem 3
interface Product {
  name: string;
  price: number;
}

function calculateTotalPrice(products: Product[]): number {
  return products.reduce((total, product) => total + product.price, 0);
}

function checkDiscount(totalPrice: number): void {
  if (totalPrice > 100) {
    console.log('Discount available!');
  }
}

// Test
const products: Product[] = [
  { name: 'Laptop', price: 1200 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 80 }
];

const total = calculateTotalPrice(products);
console.log(`Total price: ${total}`);
checkDiscount(total);


// Problem 4
interface IHero {
  name: string;
  age: number;
}

interface ISuperHero extends IHero {
  power: string;
  level?: string;
}

function levelUp(hero: ISuperHero): void {
  if (hero.age > 30) {
    hero.level = "Pro";
  } else {
    hero.level = "Newbie";
  }
  console.log(`${hero.name} is now level: ${hero.level}`);
}

// Test
const hero1: ISuperHero = {
  name: "Batman",
  age: 35,
  power: "Stealth",
};

levelUp(hero1);


// Problem 5
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

// Test
const numbers = [1, 2, 3, 4, 5];
const strings = ['a', 'b', 'c'];

console.log(getFirstElement(numbers));
console.log(getFirstElement(strings));
