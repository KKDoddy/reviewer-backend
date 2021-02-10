const reviewDefinition = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: { type: DataTypes.TEXT },
    hygieneRating: { type: DataTypes.ENUM('1', '2', '3', '4', '5') },
    roadSafetyRating: { type: DataTypes.ENUM('1', '2', '3', '4', '5') },
    professionalismRating: { type: DataTypes.ENUM('1', '2', '3', '4', '5') },
    averageRating: { type: DataTypes.FLOAT },
    rideId: { type: DataTypes.INTEGER },
    commuterId: { type: DataTypes.INTEGER },
    driverId: { type: DataTypes.INTEGER }
  }, {});

  Review.associate = function(models) {
    Review.belongsTo(models.Ride, {
      foreignKey: 'rideId',
      as: 'ride'
    });

    Review.belongsTo(models.User, {
      foreignKey: 'commuterId',
      as: 'commuter'
    });

    Review.belongsTo(models.User, {
      foreignKey: 'driverId',
      as: 'driver'
    });
  };
  return Review;
};

export default reviewDefinition;
