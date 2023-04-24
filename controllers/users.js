const { request, response } = require("express");
const bcryptjs = require("bcrypt");

const User = require("../models/usuario");

let userDB = [
  {
    id: 1,
    name: "Matias",
    mail: "matias@apeirongs.com",
    password: "123456",
  },
  {
    id: 2,
    name: "Matias",
    mail: "matias@apeirongs.com",
    password: "123456",
  },
];

// GET /users: Retrieve a list of all users. The list should be returned in JSON format.
const getUsers = async (req, res) => {
  const { consulta } = req.params;
  const [total, usuarios] = await Promise.all([
    // Cuenta cuantos datos guardados hay
    User.countDocuments(consulta),
    // Filtra segun el query, con skip dice desde donde y limit dice cuantos
    User.find(consulta).skip(Number(0)).limit(Number(User.countDocuments(consulta))),
  ]);

  res.json({
    total,
    usuarios,
  });
};

// GET /users/:id: Retrieve a single user by ID. The user should be returned in JSON format.
const getUserId = async (req, res) => {
  const kjhzx = req.headers.id;
  console.log(kjhzx);
  // const [total, usuarios] = await Promise.all([
  //   // Cuenta cuantos datos guardados hay
  //   User.countDocuments(id),
  //   // Filtra segun el query, con skip dice desde donde y limit dice cuantos
  //   User.find(id).skip(Number(desde)).limit(Number(limite)),
  // ]);

  res.json({
    kjhzx
    // id,
    // total,
    // usuarios,
  });

  // I get the id from the request
  // const id = parseInt(req.params.id);

  // // Search the id in the userDB and return the user if found
  // const user = userDB.find((c) => c.id === id);
  // res.json({
  //   user,
  // });
};

// POST /users: Create a new user. The request body should contain the user details in JSON format.
const postUsers = async (req, res) => {
  const { name, mail, password } = req.body;

  const newUser = new User({ name, mail, password });

  if (password) {
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, salt);
  }

  console.log(newUser);

  await newUser.save();

  res.json({
    newUser,
  });

  //   userDB.push([
  //     {
  //       id: userDB.length + 1,
  //       name,
  //       mail,
  //       password,
  //     },
  //   ]);

  //   res.json({
  //     name,
  //     mail,
  //     password,
  //   });
};

// PUT /users/:id: Update a single user by ID. The request body should contain the updated user details in JSON format.
const putUsers = (req = request, res = response) => {
  const id = parseInt(req.params.id);

  const user = userDB.find((c) => c.id === id);
  const { name, mail } = req.headers;

  name ? (user.name = name) : "";
  mail ? (user.mail = mail) : "";

  res.json({
    user,
  });
};

// DELETE /users/:id: Delete a single user by ID.
const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  const user = userDB.findIndex((c) => c.id === id);
  if (user == -1) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  userDB.splice(user, 1);

  res.json({
    userDB,
  });
};

module.exports = {
  getUsers,
  getUserId,
  postUsers,
  putUsers,
  deleteUsers,
};
