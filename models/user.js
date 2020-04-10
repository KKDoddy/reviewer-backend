const userDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    social_id: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    salt: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    birthdate: { type: DataTypes.DATE },
    role: { type: DataTypes.STRING },
    isVerified: { type: DataTypes.BOOLEAN },
    provider: { type: DataTypes.STRING },
    profilePhoto: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});
  
  User.associate = (models) => {
    User.hasOne(models.Token, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};

export default userDefinition;
