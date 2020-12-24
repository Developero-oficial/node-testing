const validateEmail = (req, res, next) => {
  const {email} = req.body;

  const isEmailReg = /^\S+@\S+$/;

  if (!email || !isEmailReg.test(email)) {
    return res.status(400).json({message: 'The email is invalid'});
  }

  next();
};

module.exports = {
  validateEmail,
};
