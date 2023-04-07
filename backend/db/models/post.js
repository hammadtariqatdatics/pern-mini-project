module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdDate: DataTypes.STRING,
    status: DataTypes.ENUM(["pending", "approved"]),
  });

  return Post;
};
