const faker = require('faker');

const buildUser = (override) => ({
  uid: faker.random.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  title: faker.name.title(),
  ...override,
});

module.exports = {
  buildUser,
};
