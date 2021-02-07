const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    socialId: { type: Sequelize.STRING, unique: true },
    provider: { type: Sequelize.STRING },
    username: { type: Sequelize.STRING, unique: true },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
    salt: { type: Sequelize.STRING },
    gender: { type: Sequelize.ENUM('MALE', 'FEMALE') },
    role: { type: Sequelize.ENUM('OPERATOR', 'MANAGER', 'DRIVER', 'COMMUTER') },
    isVerified: { type: Sequelize.BOOLEAN },
    profilePhoto: { type: Sequelize.TEXT },
    birthdate: { type: Sequelize.DATE },
    createdAt: { allowNull: false, type: Sequelize.DATE },
    updatedAt: { allowNull: false, type: Sequelize.DATE },
  });
};

const down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable("Users");
};

export {
  up,
  down
};
