export default (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM({ values: ["affiliate", "employee"] }),
      unique: true,
      allowNull: true,
    },
    customerId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    dateJoined: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  Customer.associate = (model) => {
    // Customers Association with other models
    Customer.hasMany(model.Invoice);
  };

  return Customer;
};
