// Import the faker library
const faker = require('@faker-js/faker');

// Create an empty object to store the mock store database
const mockStore = {};

// Create an array of 100 persons
mockStore.persons = [];
for (let i = 0; i < 100; i++) {
  // Generate a random person object using faker
  const person = {
    id: i + 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    addressId: faker.datatype.number({ min: 1, max: 100 }),
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
    name: faker.company.companyName(),
    catchPhrase: faker.company.catchPhrase(),
    addressId: faker.datatype.number({ min: 1, max: 100 }),
  };
  // Push the company object to the companies array
  mockStore.companies.push(company);
}

// Create an array of 100 addresses
mockStore.addresses = [];
for (let i = 0; i < 100; i++) {
  // Generate a random address object using faker
  const address = {
    id: i + 1,
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    country: faker.address.country(),
  };
  // Push the address object to the addresses array
  mockStore.addresses.push(address);
}

// Create an array of 80 products
mockStore.products = [];
for (let i = 0; i < 80; i++) {
  // Generate a random product object using faker
  const product = {
    id: i + 1,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    companyId: faker.datatype.number({ min: 1, max: 5 }),
  };
  // Push the product object to the products array
  mockStore.products.push(product);
}

// Create an array of 50 purchases
mockStore.purchases = [];
for (let i = 0; i < 50; i++) {
  // Generate a random purchase object using faker
  const purchase = {
    id: i + 1,
    productId: faker.datatype.number({ min: 1, max: 80 }),
    quantity: faker.datatype.number({ min: 1, max: 10 }),
    date: faker.date.past(),
    companyId: faker.datatype.number({ min: 1, max: 5 }),
  };
  // Push the purchase object to the purchases array
  mockStore.purchases.push(purchase);
}

// Create an array of 8 sells
mockStore.sells = [];
for (let i = 0; i < 8; i++) {
  // Generate a random sell object using faker
  const sell = {
    id: i + 1,
    productId: faker.datatype.number({ min: 1, max: 80 }),
    quantity: faker.datatype.number({ min: 1, max: 10 }),
    date: faker.date.past(),
    personId: faker.datatype.number({ min: 1, max: 100 }),
    pricePerUnit :faker.commerce.price()
  }
}

console.log(JSON.stringify(mockStore, null, 2));