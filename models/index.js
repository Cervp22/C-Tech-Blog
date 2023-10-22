const User = require("./user");
const Reviews = require("./reviews");
const Comments = require("./comments");

User.hasMany(Reviews, {
  foreignKey: "user_id",
});
Reviews.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Comments, {
  foreignKey: "user_id",
});
Comments.belongsTo(User, {
  foreignKey: "user_id",
});
module.exports = { User, Reviews };
