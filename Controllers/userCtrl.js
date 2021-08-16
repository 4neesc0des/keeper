const Users = require("../models/userSchemaAndModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  // registering user
  registerUser: async (req, res) => {
    try {
      // get all the values
      const { name, email, password } = req.body;

      // check if any field is empty
      if (!name || !email || !password)
        return res.status(400).json({ msg: "Fill all the input!" });

      // check if a user exists
      const user = await Users.findOne({ email: email });
      if (user) return res.status(409).json({ msg: "Email already exists! " });

      // generating salt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json({ msg: err.message });

        // password hash
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.status(400).json({ msg: err.message });

          const newUser = new Users({
            name,
            email,
            password: hash,
          });
          await newUser.save();
        });
      });
      res.json({ msg: "Signup up successful" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      // get all the values
      const { email, password } = req.body;

      // check if any field is empty
      if (!email || !password)
        return res.status(400).json({ msg: "Fill all the input!" });

      // checking the database weather user exist or not
      const findUser = await Users.findOne({ email: email });

      // if user not found
      if (!findUser) return res.status(400).json({ msg: "User not found!" });

      // if user found
      if (findUser) {
        // password comparing
        const isMatch = await bcrypt.compare(password, findUser.password);

        // if password not match
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid password !" });
      }

      // if password and email is correct create token
      const payload = { id: findUser._id, name: findUser.name };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      res.json({ token });

      // res.json({ msg: "Login a user" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifyToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);
      jwt.verify(token, process.env.SECRET_KEY, async (err, verified) => {
        // if token not match
        if (err) return res.send(false);
        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
