const defaultOperator = {
  socialId: null,
  provider: null,
  username: 'doddy',
  name: 'Operator Doddy',
  email: 'operatordoddy@gmail.com',
  password: '$2b$10$46NJwiydFg0DO8dmWCpbxeNpJ.LW72hxHsArqTkNvRq1R0EGib12a',
  salt: '$2b$10$46NJwiydFg0DO8dmWCpbxe',
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
