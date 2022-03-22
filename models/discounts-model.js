export default (sequelize, DataTypes) => {
  const Discount = sequelize.define("Discount", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Discount.associate = (model) => {
    // Discount Association with other models
  };

  return Discount;
};
