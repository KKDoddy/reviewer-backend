const defaultOperator = {
  socialId: null,
  provider: null,
  username: 'doddy',
  name: 'Kalimba Kwizera Doddy',
  email: 'kwizeradoddy@yahoo.com',
  password: '$2b$10$8kO/8loIDRkI51SCxd.8T.rmBSh2G54A3wBNaPJeFW9T2cpQpuwd6',
  salt: '$2b$10$8kO/8loIDRkI51SCxd.8T.',
  gender: 'MALE',
  role: 'OPERATOR',
  isVerified: true,
  profilePhoto: null,
  birthdate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

const up = (queryInterface) => queryInterface.bulkInsert ('Users', [
  defaultOperator
]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
}
