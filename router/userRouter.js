const express = require("express");
const userRouter = express.Router();
const { compareHash } = require("../utils/hash");
var users = require("../models/userModel");
var friends = require("../models/friendsModel");
const { sign } = require("../utils/jwtService");

userRouter.post("/friends", async (req, res) => {
  const { email, password } = req.body;
  // console.log("email" + email);
  const user = await users.findOne({ where: { email: email } });
  var User = user.get();
  var arr = [];
  if (User) {
    const isValidPassword = compareHash(password, User.password);

    if (isValidPassword) {
      const token = sign({
        sub: "user",
        email
      });

      friends
        .findAll({
          where: {
            friend_id: User.id
          }
        })
        .then((friends) => {
          //console.log(friends);
          for (var i = 0; i < friends.length; i++) {
            const { id, firstName, lastName, age, gender, friendId } = friends[
              i
            ].dataValues;
            arr.push({ id, firstName, lastName, age, gender, friendId });
          }

          console.log(arr);
          res.cookie("data", arr, { httpOnly: true });

          res.cookie("jwt", token, { httpOnly: true });

          res.status(200).json({
            message: "Valid Admin!",
            data: arr
          });
        })
        .catch((err) => {
          console.log("error occusred", err);
        });
      // console.log("aaaaaaaaaaaaaaaaaa");
      // console.log("arr is" + arr);
      // console.log("aaaaaaaaaaaaaaaaaa");
      // res.cookie("jwt", token, { httpOnly: true });

      // res.status(200).json({
      //   message: "Valid Admin!",
      //   data: arr
      // });
    } else {
      res.status(401).send("Invalid User");
    }
  } else {
    res.status(401).send("Invalid User");
  }

  // var userId = User.id;
  // friends
  //   .findAll({
  //     where: {
  //       friend_id: userId
  //     }
  //   })
  //   .then((result) => {
  //     console.log(JSON.parse(result));
  //   });
});

module.exports = userRouter;
