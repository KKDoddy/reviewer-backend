const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    comment: {
      type: Sequelize.TEXT
    },
    hygieneRating: {
      type: Sequelize.ENUM('1', '2', '3', '4', '5')
    },
    roadSafetyRating: {
      type: Sequelize.ENUM('1', '2', '3', '4', '5')
    },
    professionalismRating: {
      type: Sequelize.ENUM('1', '2', '3', '4', '5')
    },
    averageRating: {
      type: Sequelize.FLOAT
    },
    rideId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    commuterId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    driverId: {
      type: Sequelize.INTEGER,
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
  return queryInterface.dropTable('Reviews');
};

export {
  up,
  down
};
