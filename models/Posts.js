module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "Posts",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "게시글을 적는 유저 닉네임",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "게시글을 적는 유저의 비밀번호",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "게시글의 제목",
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "게시글의 내용",
      },
      // countOfLike: {
      //   type: DataTypes.STRING,
      //   defaultValue: 0,
      //   comment: "게시글 좋아요 수",
      // },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  Posts.associate = (models) => {
    Posts.hasMany(models.Manager, {
      onDelete: "cascade",
    });

    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });

    // Posts.belongsToMany(models.Likes, {
    //   onDelete: "cascade",
    //   through: "LikeAndPost",
    // });

    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Posts.hasMany(models.Hates, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
