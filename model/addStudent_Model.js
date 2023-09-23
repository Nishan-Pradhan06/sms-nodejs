module.exports = (sequelize, DataTypes) => {
  const Studentlist = sequelize.define("studentlist", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bloodgroup: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });
  return Studentlist;
};