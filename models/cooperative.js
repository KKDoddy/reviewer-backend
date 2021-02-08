
const cooperativeDefinition = (sequelize, DataTypes) => {
  const Cooperative = sequelize.define('Cooperative', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    location: {type: DataTypes.STRING},
    manager: { type: DataTypes.INTEGER }
  }, {});
  
  Cooperative.associate = (models) => {
    Cooperative.belongsTo(models.User, {
      foreignKey: 'manager'
    });

    Cooperative.hasMany(models.User, {
      foreignKey: 'cooperativeId'
    });
  };

  return Cooperative
};

export default cooperativeDefinition;
