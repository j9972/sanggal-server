module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define(
    "Manager",
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notNull: true,
        },
        allowNull: false,
        comment: "이메일",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "관리자의 닉네임",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "관리자의 비밀번호",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  return Manager;
};
