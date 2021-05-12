const userDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    socialId: { type: DataTypes.STRING },
    provider: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    salt: { type: DataTypes.STRING },
    gender: { type: DataTypes.ENUM('MALE', 'FEMALE') },
    role: { type: DataTypes.ENUM('OPERATOR', 'MANAGER', 'DRIVER', 'COMMUTER') },
    cooperativeId: { type: DataTypes.INTEGER },
    isVerified: { type: DataTypes.BOOLEAN },
    profilePhoto: { type: DataTypes.TEXT },
    birthdate: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  User.associate = (models) => {
    User.hasOne(models.Token, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasOne(models.MotorVehicle, {
      foreignKey: 'driver',
      onDelete: 'RESTRICT'
    });

    User.hasMany(models.Ride, {
      foreignKey: 'commuterId',
      as: 'userRides'
    });

    User.hasMany(models.Ride, {
      foreignKey: 'driverId',
      as: 'driverRides'
    });

    User.hasMany(models.Review, {
      foreignKey: 'commuterId',
      as: 'userReviews'
    });

    User.hasMany(models.Review, {
      foreignKey: 'driverId',
      as: 'driverReviews'
    });

    User.belongsTo(models.Cooperative, {
      foreignKey: 'cooperativeId',
      as: 'memberOf'
    });
  };
  return User;
};

export default userDefinition;
