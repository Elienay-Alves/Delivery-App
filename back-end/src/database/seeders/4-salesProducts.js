module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SalesProducts',
    [{
      sale_id: 1,
      product_id: 1,
      quantity: 4,
    }, 
    {
      sale_id: 2,
      product_id: 3,
      quantity: 12,
    },
    {
      sale_id: 2,
      product_id: 1,
      quantity: 8,
    },
    {
      sale_id: 3,
      product_id: 2,
      quantity: 5,
    },
    ], { timestamps: false });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SalesProducts', null, {});
  },
}