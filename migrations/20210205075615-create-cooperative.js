const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('Cooperatives', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
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
    manager: {
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
  return queryInterface.dropTable('Cooperatives');
};

export {
  up,
  down
};
