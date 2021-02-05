const userDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    social_id: { type: DataTypes.STRING },
    provider: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    salt: { type: DataTypes.STRING },
    gender: { type: DataTypes.ENUM('MALE', 'FEMALE') },
    role: { type: DataTypes.ENUM('OPERATOR', 'MANAGER', 'DRIVER', 'COMMUTER') },
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

    User.hasOne(models.Cooperative, {
      foreignKey: 'manager',
      onDelete: 'RESTRICT'
    });

    User.hasOne(models.MotorVehicle, {
      foreignKey: 'driver',
      onDelete: 'RESTRICT'
    });

    User.hasMany(models.Ride, {
      foreignKey: 'commuterId'
    });

    User.hasMany(models.Ride, {
      foreignKey: 'driverId'
    });

    User.hasMany(models.Review, {
      foreignKey: 'commuterId'
    });

    User.hasMany(models.Review, {
      foreignKey: 'driverId'
    });
  };
  return User;
};

export default userDefinition;
