const motorVehicleDefinition = (sequelize, DataTypes) => {
  const MotorVehicle = sequelize.define('MotorVehicle', {
    plateNumber: { type: DataTypes.STRING },
    driver: { type: DataTypes.INTEGER },
    owner: { type: DataTypes.STRING }
  }, {});

  MotorVehicle.associate = (models) => {
    MotorVehicle.belongsTo(models.User, {
      foreignKey: 'driver'
    });
  };

  return MotorVehicle;
};

export default motorVehicleDefinition;
