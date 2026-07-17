const User = require("../models/User.js")

const handleErrors = (e) => {
  // console.log(e.message, e.code)
  let errors = { email: "", password: "" }

  if (e.code == 11000) {
    errors.email = "Email is already registered"
  }
  // validation errors 
  if (e.message.includes('user validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user)
  } catch (e) {
    const errors = handleErrors(e)
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  res.send('user login');
}
