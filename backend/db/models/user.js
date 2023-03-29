module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(["normalUser", "adminUser"]),
  });

  User.associate = (models) => {
    User.hasMany(models.Post);
  };

  return User;
};
