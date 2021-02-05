const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('Rides', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    startLocation: {
      type: Sequelize.STRING
    },
    endLocation: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    },
    startTime: {
      type: Sequelize.TIME
    },
    endTime: {
      type: Sequelize.TIME
    },
    commuterId: {
      type: Sequelize.INTEGER
    },
    driverId: {
      type: Sequelize.INTEGER
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
  return queryInterface.dropTable('Rides');
};

export {
  up,
  down
};
