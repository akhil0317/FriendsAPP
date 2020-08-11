const friend = require("../models/friendsModel");
const friendData = require("../models/friendsData");

const friendSeed = async () => {
  await friend.sync({ force: true });

  friendData.forEach(async (Friend) => {
    try {
      console.log(Friend);
      const result = await friend.create(Friend);
      console.log(result.get());
    } catch (e) {
      console.error(e);
    }
  });
};

friendSeed();
