const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('MotorVehicles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    plateNumber: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    driver: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    owner: {
      type: Sequelize.STRING,
      allowNull: false
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
  return queryInterface.dropTable('MotorVehicles');
};

export {
  up,
  down
};
