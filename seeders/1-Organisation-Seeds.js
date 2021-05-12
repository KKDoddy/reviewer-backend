const defaultCooperative = {
    name: 'COPAMOTANYA',
    email: 'copamotanya@gmail.com',
    phone: '0788225325',
    location: 'Nyamirambo',
    createdAt: new Date(),
    updatedAt: new Date()
  };

const up = (queryInterface) => queryInterface.bulkInsert ('Cooperatives', [
    defaultCooperative
  ]);
  
const down = (queryInterface) => queryInterface.bulkDelete('Cooperatives', null, {});

export {
    up,
    down
}
