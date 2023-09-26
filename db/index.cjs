const {faker} = require('@faker-js/faker');

// Create an empty object to store the mock store database
const mockStore = {};

// Create an array of 100 persons
mockStore.persons = [];
for (let i = 0; i < 100; i++) {
  // Generate a random person object using faker
  const person = {
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    addressId: faker.number.int({ min: 1, max: 100 }),
  };
  // Push the person object to the persons array
  mockStore.persons.push(person);
}

console.log(JSON.stringify(mockStore, null, 2));