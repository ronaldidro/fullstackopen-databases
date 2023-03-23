const jwt = require("jsonwebtoken");

const { Blog, User, Session } = require("../models");
const { SECRET } = require("../util/config");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const errorHandler = (error, req, res, next) => {
  console.error(`${error.name}: ${error.message}`);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "SequelizeDatabaseError") {
    return res.status(400).send({ error: "invalid data type" });
  } else if (error.name == "SequelizeUniqueConstraintError") {
    return res.status(400).send({ error: "username already used" });
  }

  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const session = await Session.findOne({
        where: { token: authorization.substring(7) },
      });

      if (!session) {
        return res.status(401).json({ error: "token disabled" });
      }

      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);

      const user = await User.findByPk(req.decodedToken.id);

      if (user.disabled) {
        await session.destroy();
        return res.status(401).json({ error: "account was disabled" });
      }
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = {
  blogFinder,
  errorHandler,
  tokenExtractor,
};
