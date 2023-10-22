const router = require("express").Router();
const { User, Reviews } = require("../models");
const withAuth = require("../utils/auth");

//render homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const UserData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Reviews,
          attributes: ["review_title", "review_content", "id"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
      order: [["username", "ASC"]],
    });
    const user = UserData.get({ plain: true });
    console.log(user);

    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

//dashboard endpoint
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const reviewData = await Reviews.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const reviews = reviewData.map((reviews) => reviews.get({ plain: true }));
    console.log(reviews);

    res.render("dashboard", {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: "Look at endpoint!" });
  }
});
module.exports = router;
