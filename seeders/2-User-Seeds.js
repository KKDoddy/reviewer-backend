const defaultOperator = {
  socialId: null,
  provider: null,
  username: 'doddy',
  name: 'Operator Doddy',
  email: 'operatordoddy@gmail.com',
  phoneNumber: '0785588688',
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

const defaultManager = {
  socialId: null,
  provider: null,
  username: 'managerdoddy',
  name: 'Manager Doddy',
  email: 'managerdoddy@gmail.com',
  phoneNumber: '0785588699',
  cooperativeId: 1,
  password: '$2b$10$twp4KXTikUpuGANvR8lH9uv8s5a22EdjKlwbeQBxaphi3ou/JwnwO',
  salt: '$2b$10$twp4KXTikUpuGANvR8lH9u',
  gender: 'MALE',
  role: 'MANAGER',
  isVerified: true,
  profilePhoto: null,
  birthdate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

const defaultDriver = {
  socialId: null,
  provider: null,
  username: 'driverdoddy',
  name: 'Driver Doddy',
  email: 'driverdoddy@gmail.com',
  phoneNumber: '07855886955',
  cooperativeId: 1,
  password: '$2b$10$aeYyUdhbu4VeiQOqshbSKeQ20y6XpTr6ctj.i.FuEtaF2Fq5BTbRa',
  salt: '$2b$10$aeYyUdhbu4VeiQOqshbSKe',
  gender: 'MALE',
  role: 'DRIVER',
  isVerified: true,
  profilePhoto: null,
  birthdate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

const defaultCommuter = {
  socialId: null,
  provider: null,
  username: 'commuterdoddy',
  name: 'Commuter Doddy',
  email: 'commuterdoddy@gmail.com',
  phoneNumber: '0785588633',
  password: '$2b$10$0WaWys6.hQfvHGPnz4qc4O8Mjr967rAc4h0aMFmiELY7WQLocbtKe',
  salt: '$2b$10$0WaWys6.hQfvHGPnz4qc4O',
  gender: 'MALE',
  role: 'COMMUTER',
  isVerified: true,
  profilePhoto: null,
  birthdate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

const up = (queryInterface) => queryInterface.bulkInsert ('Users', [
  defaultOperator, defaultManager, defaultDriver, defaultCommuter
]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
}
