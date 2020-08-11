const { verify } = require("../utils/jwtService");

const auth = (req, res, next) => {
  if (req.cookies.jwt != undefined) {
    const payload = verify(req.cookies.jwt);
    if (payload) {
      req.jwt = payload;
      //next();
      res.redirect("/friends");
    } else {
      res.redirect("/userLogin");
    }
  } else res.redirect("/userLogin");
};

module.exports = auth;
