module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "유저의 닉네임",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "유저의 비밀번호",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Manager, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Hates, {
      onDelete: "cascade",
    });
  };

  return Users;
};
