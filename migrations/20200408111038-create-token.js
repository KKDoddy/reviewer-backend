const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('Tokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tokenValue: {
      type: Sequelize.STRING,
      unique: true
    },
    userId: {
      type: Sequelize.INTEGER,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};

const down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('Tokens');
};

export default {
  up,
  down
};