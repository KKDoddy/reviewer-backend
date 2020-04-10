const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    social_id: { type: Sequelize.STRING, unique: true },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
    salt: { type: Sequelize.STRING },
    username: { type: Sequelize.STRING, unique: true },
    gender: { type: Sequelize.STRING },
    birthdate: { type: Sequelize.DATE },
    role: { type: Sequelize.STRING },
    isVerified: { type: Sequelize.BOOLEAN },
    provider: { type: Sequelize.STRING },
    profilePhoto: { type: Sequelize.STRING },
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
