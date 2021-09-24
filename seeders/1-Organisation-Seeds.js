const defaultCooperative = {
  name: 'COPAMOTANYA',
  email: 'copamotanya@gmail.com',
  phone: '0788225325',
  location: 'Nyamirambo',
  createdAt: new Date(),
  updatedAt: new Date()
};

const copamotakiCooperative = {
  name: 'COPAMOTAKI',
  email: 'motardkicukiro@gmail.com',
  phone: '0785166021',
  location: 'Kicukiro',
  createdAt: new Date(),
  updatedAt: new Date()
};

const up = (queryInterface) => queryInterface.bulkInsert ('Cooperatives', [
  defaultCooperative, copamotakiCooperative
]);

const down = (queryInterface) => queryInterface.bulkDelete('Cooperatives', null, {});

export {
  up,
  down
}
