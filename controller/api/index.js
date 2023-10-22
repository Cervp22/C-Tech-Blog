const router = require("express").Router();

const userRoutes = require("./users-routes");
const reviewRoutes = require("./reviews-routes");

router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
