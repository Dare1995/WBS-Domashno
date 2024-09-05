const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { getByEmail, create } = require("../pkg/account");
const {
  validateAccount,
  AccoutLogin,
  AccoutRegister,
} = require("../pkg/account/validate");
const { getSection } = require("../pkg/config");
const { userLoginAttempt } = require("../pkg/account/userLogin");


const login = async (req, res) => {
  try {
    await validateAccount(req.body, AccoutLogin);
    const { email, password } = req.body;

    const ipAddress = req.ip; // get ip

    const account = await getByEmail(email);

    if (!account) {
      return res.status(400).send("Account not found!");
    }

    // if (!bcrypt.compareSync(password, account.password)) {
    //   return res.status(400).send("Wrong password!");
    // }

    const isPasswordValid = await bcrypt.compareSync(password, account.password);
    if (!isPasswordValid) {
      await userLoginAttempt(email, "FAILURE", ipAddress);
      return res.status(400).send("Wrong password!");
    }

    await userLoginAttempt(email, "SUCCESS", ipAddress);

    const payload = {
      username: account.username,
      email: account.email,
      id: account._id,
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);
    // if (token) {
    //   await userLoginAttempt(email, "SUCCESS", ipAddress);
    // } else {
    //   await userLoginAttempt(email, "FAILURE", ipAddress);
    //   return res.status(400).send("Wrong password!");
    // }
    return res.status(200).send({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const register = async (req, res) => {
  try {
    await validateAccount(req.body, AccoutRegister);
    const { username, email, password, confirmPassword } = req.body;

    const exist = await getByEmail(email);
    if (exist) {
      return res.status(400).send("Account with this email already exists!");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }

    const data = {
      username,
      email,
      password: bcrypt.hashSync(password),
    };

    const account = await create(data);
    return res.status(200).send(account);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  login,
  register,
};