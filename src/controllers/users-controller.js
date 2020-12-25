const {
  getUsers,
  getUserByUid,
  addUser,
  updateUser,
  deleteUser,
} = require('../db/users-db');

const getUsersController = (req, res) => {
  const users = getUsers();
  res.status(200).send({users});
};

const getUserByUidController = (req, res) => {
  const user = getUserByUid(req.params.uid);
  res.status(200).send({user});
};

const createUserController = (req, res) => {
  const {name, title} = req.body;
  const user = addUser({name, title});
  res.status(201).send({user});
};

const updateUserController = (req, res) => {
  const {name, title} = req.body;
  const uid = req.params.uid;
  const user = updateUser({uid, name, title});
  res.status(200).send({user});
};

const deleteUserController = (req, res) => {
  const uid = req.params.uid;
  deleteUser(uid);
  res.status(200).send({});
};

module.exports = {
  getUsersController,
  getUserByUidController,
  createUserController,
  updateUserController,
  deleteUserController,
};
