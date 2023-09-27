const { faker } = require("@faker-js/faker");
const { mock } = require("node:test");

// Create an empty object to store the mock store database
const mockStore = {};

// Create an array of 100 addresses
mockStore.addresses = [];
for (let i = 0; i < 65; i++) {
  // Generate a random address object using faker
  const address = {
    id: i + 1,
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
  // Push the address object to the addresses array
  mockStore.addresses.push(address);
}

// Create an array of 100 persons
mockStore.persons = [];
for (let i = 0; i < 60; i++) {
  // Generate a random person object using faker
  const person = {
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: mockStore.addresses[faker.number.int({ min: 1, max: 66 })],
  };
  // Push the person object to the persons array
  mockStore.persons.push(person);
}

// Create an array of 5 companies
mockStore.companies = [];
for (let i = 0; i < 5; i++) {
  // Generate a random company object using faker
  const company = {
    id: i + 1,
    name: faker.company.name(),
    catchPhrase: faker.company.catchPhrase(),
    address: mockStore.addresses[faker.number.int({ min: 1, max: 66 })],
  };
  // Push the company object to the companies array
  mockStore.companies.push(company);
}

// Create an array of 80 products
mockStore.products = [];
for (let i = 0; i < 30; i++) {
  // Generate a random product object using faker
  const product = {
    id: i + 1,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    storage: faker.number.int({ min: 1, max: 100 }),
    description: faker.commerce.productDescription(),
    company: mockStore.companies[faker.number.int({ min: 1, max: 5 })],
  };
  // Push the product object to the products array
  mockStore.products.push(product);
}

// Create an array of 50 purchases
mockStore.purchases = [];
for (let i = 0; i < 15; i++) {
  // Generate a random purchase object using faker
  const purchase = {
    id: i + 1,
    product: mockStore.products[faker.number.int({ min: 1, max: 31 })],
    quantity: faker.number.int({ min: 1, max: 10 }),
    date: faker.date.past(),
    company: mockStore.companies[faker.number.int({ min: 1, max: 5 })],
  };
  // Push the purchase object to the purchases array
  mockStore.purchases.push(purchase);
}

// Create an array of 8 sells
mockStore.sells = [];
for (let i = 0; i < 20; i++) {
  // Generate a random sell object using faker
  const sell = {
    id: i + 1,
    product: mockStore.products[faker.number.int({ min: 1, max: 31 })],
    quantity: faker.number.int({ min: 1, max: 10 }),
    date: faker.date.past(),
    person: mockStore.persons[faker.number.int({ min: 1, max: 59 })],
    pricePerUnit: faker.commerce.price(),
  };
  // Push the sell object to the sells array
  mockStore.sells.push(sell);
}

console.log(JSON.stringify(mockStore));
