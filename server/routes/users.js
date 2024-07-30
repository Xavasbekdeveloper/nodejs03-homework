const { users } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //   res.send(users);

  if (!users.length) {
    return res.status(400).json({
      msg: "malumot topilmadi",
      variant: "error",
      payload: null,
    });
  }

  res.status(200).json({
    msg: "barcha foydalanuvchilar",
    variant: "success",
    payload: users,
    total: users.length,
  });
});

router.post("/", (req, res) => {
  const { fname, username, password } = req.body;
  if (!fname || !username || !password) {
    return res.status(400).json({
      msg: "malumotlarni to'ldiring",
      variant: "error",
      payload: null,
    });
  }

  let index = users.find((user) => user.username === username);

  if (index) {
    res.status(400).json({
      msg: "foydalanuvchi nomi mavjud",
      variant: "warning",
      payload: null,
    });
  }

  const newUser = {
    id: new Date().getTime(),
    fname,
    username,
    password,
  };

  users.push(newUser);

  res.status(201).json({
    msg: "foydalanuvchi qo'shildi",
    variant: "success",
    payload: newUser,
  });
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let index = users.find((user) => user.id === +id);
  let existUser = users.findIndex((user) => user.id === +id);
  if (existUser < 0) {
    return res.status(400).json({
      msg: "foydalanuvchi topilmadi",
      variant: "error",
      payload: null,
    });
  }
  users.splice(existUser, 1);

  res.status(200).json({
    msg: "foydalanuvchi o'chirildi",
    variant: "success",
    payload: index,
  });
});

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { fname, username, password } = req.body;
  if (!fname || !username || !password) {
    return res.status(400).json({
      msg: "malumotlarni to'ldiring",
      variant: "error",
      payload: null,
    });
  }
  let index = users.findIndex((user) => user.id === +id);
  if (index < 0) {
    return res.status(400).json({
      msg: "foydalanuvchi topilmadi",
      variant: "error",
      payload: null,
    });
  }
  let updateUser = {
    id: +id,
    fname,
    username,
    password,
  };

  users.splice(index, 1, updateUser);
  res.status(200).json({
    msg: "foydalanuvchi yangilandi",
    variant: "success",
    payload: updateUser,
  });
});

module.exports = router;
