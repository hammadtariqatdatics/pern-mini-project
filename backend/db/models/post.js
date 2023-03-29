module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    created: DataTypes.DATE,
    status: DataTypes.ENUM(["pending", "approved"]),
    userId: DataTypes.INTEGER,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User);
  };

  return Post;
};
