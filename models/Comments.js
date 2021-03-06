module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "댓글을 다는 유저의 닉네임",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "댓글을 다는 유저의 비밀번호",
      },
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "댓글 내용",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  Comments.associate = (models) => {
    Comments.hasMany(models.Manager, {
      onDelete: "cascade",
    });
  };

  return Comments;
};
