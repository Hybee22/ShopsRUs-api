export default (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    invoiceId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });

  Invoice.associate = (model) => {
    // Invoice Association with other models
    Invoice.belongsTo(model.Customer);
  };

  return Invoice;
};
