const {buildUser} = require('../helpers/builders');

let users = [buildUser({email: 'john.doe@mail.com'}), buildUser(), buildUser()];

const getUsers = () => users;

const getUserByUid = (uid) => users.filter((user) => user.uid === uid)[0];

const getUserByEmail = (email) =>
  users.filter((user) => user.email === email)[0];

const addUser = ({name, title, email}) => {
  const newUser = buildUser({name, title, email});
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
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
};
