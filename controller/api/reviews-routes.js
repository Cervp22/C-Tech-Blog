const router = require("express").Router();

const { Reviews, User } = require("../../models");
const withAuth = require("../../utils/auth");

// /api/reviews endpoint

router.post("/submitreview", async (req, res) => {
  try {
    const dbUserData = await Reviews.create({
      review_title: req.body.reviewTitle,
      review_content: req.body.reviewContent,
      user_id: req.session.user_id,
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "try again. Checkend point!" });
  }
});

router.get("/reveiwsubmitted", (req, res) => {
  res.render("reviewsubmitted");
});

//Get all reviews api endpoint
router.get("/", async (req, res) => {
  try {
    const reviewsData = await Reviews.findAll({
      include: [{ model: User, attributes: ["username", "email"] }],
    });
    res.status(200).json(reviewsData);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const reviewsData = await Reviews.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username", "email"] }],
    });
    !reviewsData
      ? res.status(404).json({ message: "Check endpoint" })
      : res.status(200).json(reviewsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteReview = await Reviews.destroy({
      where: { id: req.params.id },
    });

    !deleteReview
      ? res.status(404).json({ message: "Check endpoint!" })
      : res
          .status(200)
          .json(deleteReview, { message: "Review has been deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Check Server endpoint!", err });
  }
});
module.exports = router;
