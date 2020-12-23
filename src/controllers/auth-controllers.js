const {getUserByEmail} = require('../db/users-db');
const jwt = require('jsonwebtoken');

const {secret} = require('../config');

const login = (req, res) => {
  const {email} = req.body;

  const user = getUserByEmail(email);

  if (user) {
    const token = jwt.sign({name: user.name}, secret);
    return res.status(200).send({token});
  }

  res.status(401).send({message: 'email or password incorrect'});
};

module.exports = {login};
