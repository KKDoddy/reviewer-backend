const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('Cooperatives', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    phone: {
      type: Sequelize.STRING,
      unique: true
    },
    location: {
      type: Sequelize.STRING
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
  return queryInterface.dropTable('Cooperatives');
};

export {
  up,
  down
};
