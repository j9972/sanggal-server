module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes");

  Likes.associate = (models) => {
    Likes.hasMany(models.Manager, {
      onDelete: "cascade",
    });
  };

  return Likes;
};
