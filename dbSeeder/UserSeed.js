const user = require("../models/userModel");
const userData = require("../models/userData");

const userSeed = async () => {
  await user.sync({ force: true });

  userData.forEach(async (User) => {
    try {
      console.log(User);
      const result = await user.create(User);
      console.log(result.get());
    } catch (e) {
      console.error(e);
    }
  });
};

userSeed();
