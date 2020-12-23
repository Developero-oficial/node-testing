const faker = require('faker');

const buildUser = (override) => ({
  uid: faker.random.uuid(),
  name: faker.name.firstName(),
  title: faker.name.title(),
  ...override,
});

let users = [buildUser(), buildUser(), buildUser()];

const getUsers = () => users;

const getUserByUid = (uid) => users.filter((user) => user.uid === uid)[0];

const addUser = ({name, title}) => {
  const newUser = buildUser({name, title});
  users.push(newUser);
  return newUser;
};

const updateUser = ({uid, name, title}) => {
  const usersUpdated = users.map((user) => {
    if (user.uid === uid) {
      return {...user, name, title};
    }

    return user;
  });

  users = usersUpdated;
  return {uid, name, title};
};

const deleteUser = (uid) => {
  users = users.filter((user) => user.uid !== uid);
};

module.exports = {
  getUsers,
  getUserByUid,
  addUser,
  updateUser,
  deleteUser,
};
