
const cooperativeDefinition = (sequelize, DataTypes) => {
  const Cooperative = sequelize.define('Cooperative', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    location: {type: DataTypes.STRING},
  }, {});
  
  Cooperative.associate = (models) => {
    Cooperative.hasMany(models.User, {
      foreignKey: 'cooperativeId',
      as: 'memberOf'
    });
  };

  return Cooperative
};

export default cooperativeDefinition;
