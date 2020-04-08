const tokenDefinition = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    tokenValue: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  Token.associate = (models) => {
    Token.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return Token;
};

export default tokenDefinition;
