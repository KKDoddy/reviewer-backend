const rideDefinition = (sequelize, DataTypes) => {
  const Ride = sequelize.define('Ride', {
    startLocation: { type: DataTypes.STRING },
    endLocation: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT },
    startTime: { type: DataTypes.TIME },
    endTime: { type: DataTypes.TIME },
    commuterId: { type: DataTypes.INTEGER },
    driverId: { type: DataTypes.INTEGER }
  }, {});

  Ride.associate = (models) => {
    Ride.belongsTo(models.User, {
      foreignKey: 'commuterId',
      as: 'commuter'
    });

    Ride.belongsTo(models.User, {
      foreignKey: 'driverId',
      as: 'driver'
    });

    Ride.hasOne(models.Review, {
      foreignKey: 'rideId'
    });
  };

  return Ride;
};

export default rideDefinition;
