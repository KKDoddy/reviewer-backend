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
      type: Sequelize.DATE
    },
    endTime: {
      type: Sequelize.DATE
    },
    commuterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      
    },
    driverId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('PENDING', 'APPROVED', 'DENIED', 'EN-ROUTE', 'ENDED'),
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
  return queryInterface.dropTable('Rides');
};

export {
  up,
  down
};
