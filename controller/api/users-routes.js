const router = require("express").Router();

const { User, Reviews } = require("../../models");

// /api/users/  endpoint

//Create new user
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Try again!" });
  }
});

//login endpoint
router.post("/login", async (req, res) => {
  try {
    const userlogin = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userlogin) {
      res
        .status(404)
        .json({ message: "incorrect email or password, try again!" });
      return;
    }

    const validPassword = await userlogin.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(404)
        .json({ message: "Incorrect username or password, Try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userlogin.id;
      req.session.logged_in = true;

      res.json({ user: userlogin, message: "You are logged in!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Check your login end point!" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end().json({ message: "Check endpoint!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", 'fullname'],
      include: [{ model: Reviews }],
    });
    !users
      ? res.status(404).json({ message: "Check endpoint" })
      : res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "email"],
      include: [{ model: Reviews }],
    });
    !userData
      ? res.status(404).json({ message: "Check your endpoint!" })
      : res.status(202).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
