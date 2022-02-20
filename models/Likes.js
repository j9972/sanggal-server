module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    countOfLike: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "게시글 좋아요 수",
    },
  });

  Likes.associate = (models) => {
    Likes.hasMany(models.Manager, {
      onDelete: "cascade",
    });

    /*
    Likes.hasMany(models.Posts, {
      onDelete: "cascade",
      //constraints: false,
    });
    */

    /*
    Likes.belongsToMany(models.Posts, {
      onDelete: "cascade",
      through: "LikeAndPost",
    });
*/
  };

  return Likes;
};

// like에 constraints: false
