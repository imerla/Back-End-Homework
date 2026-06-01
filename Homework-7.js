//Problem 1
class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  getPerimeter() {
    return this.a + this.b + this.c;
  }

  getArea() {
    const s = this.getPerimeter() / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }

  isRightTriangle() {
    const sides = [this.a, this.b, this.c].sort((x, y) => x - y);
    const [a, b, c] = sides;
    return Math.abs(a * a + b * b - c * c) < 0.00000000001;
  }
}

// Test
const t = new Triangle(5, 4, 3);
console.log(t.getPerimeter(), t.getArea(), t.isRightTriangle());


// Problem 2
class Smartphone {
  constructor(brand, model, releaseYear) {
    this.brand = brand;
    this.model = model;
    this.releaseYear = releaseYear;
  }
}

class GamingPhone extends Smartphone {
  constructor(brand, model, releaseYear, gpuScore, batteryCapacity) {
    super(brand, model, releaseYear);
    this.gpuScore = gpuScore;
    this.batteryCapacity = batteryCapacity;
  }

  performanceIndex() {
    return this.gpuScore * (this.batteryCapacity / 1000);
  }
}

// Test
const gamingPhone = new GamingPhone('Asus', 'ROG Phone', 2023, 8500, 6000);
console.log('Gaming Phone:', gamingPhone.brand, gamingPhone.model);
console.log('Performance Index:', gamingPhone.performanceIndex());


// Problem 3
class CryptoWallet {
  constructor(initialBalance = 0) {
    this.balance = initialBalance;
    this.history = [];
  }

  deposit(amount) {
    this.balance += amount;
    this.history.push({ type: 'deposit', amount, timestamp: new Date() });
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error('Insufficient balance');
    }
    this.balance -= amount;
    this.history.push({ type: 'withdraw', amount, timestamp: new Date() });
  }

  transfer(targetWallet, amount) {
    if (amount > this.balance) {
      throw new Error('Insufficient balance');
    }
    this.balance -= amount;
    targetWallet.balance += amount;
    this.history.push({ type: 'transfer', amount, to: targetWallet, timestamp: new Date() });
    targetWallet.history.push({ type: 'receive', amount, from: this, timestamp: new Date() });
  }

  getHistory() {
    return this.history;
  }
}

// Test
const wallet1 = new CryptoWallet(100);
const wallet2 = new CryptoWallet(50);

wallet1.deposit(50);
wallet1.withdraw(30);
wallet1.transfer(wallet2, 20);

console.log('Wallet 1 Balance:', wallet1.balance);
console.log('Wallet 2 Balance:', wallet2.balance);
console.log('Wallet 1 History:', wallet1.getHistory());
console.log('Wallet 2 History:', wallet2.getHistory());


// Problem 4
class Wishlist {
  constructor() {
    this.items = [];
    this.nextId = 1;
  }

  addItem(name, price) {
    const item = {
      id: this.nextId++,
      name,
      price,
      addedAt: new Date()
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  updateItem(id, updates) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      Object.assign(item, updates);
      return item;
    }
    return null;
  }
}

// Test
const wishlist = new Wishlist();
const item1 = wishlist.addItem('Laptop', 1200);
const item2 = wishlist.addItem('Phone', 800);
const item3 = wishlist.addItem('Headphones', 150);

console.log('Items after adding:', wishlist.items);

wishlist.deleteItem(2);
console.log('Items after deleting ID 2:', wishlist.items);

wishlist.updateItem(1, { price: 1100, name: 'Gaming Laptop' });
console.log('Items after updating ID 1:', wishlist.items);


// Problem 5
class Freelancer {
  constructor(hourlyRate) {
    this.hourlyRate = hourlyRate;
    this.hoursWorked = 0;
  }

  calculateEarnings(bonusRate = 0.5) {
    const regularHours = Math.min(this.hoursWorked, 160);
    const overtimeHours = Math.max(this.hoursWorked - 160, 0);
    
    const regularEarnings = regularHours * this.hourlyRate;
    const overtimeEarnings = overtimeHours * this.hourlyRate * (1 + bonusRate);
    
    return regularEarnings + overtimeEarnings;
  }

  addHours(hours) {
    this.hoursWorked += hours;
  }
}

// Test
const freelancer = new Freelancer(50);
freelancer.addHours(180);
console.log('Earnings with 50% bonus:', freelancer.calculateEarnings(0.5));
console.log('Earnings without bonus:', freelancer.calculateEarnings(0));
