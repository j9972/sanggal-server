module.exports = (sequelize, DataTypes) => {
  const Hates = sequelize.define("Hates");

  Hates.associate = (models) => {
    Hates.hasMany(models.Manager, {
      onDelete: "cascade",
    });
  };

  return Hates;
};
