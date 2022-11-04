module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales_products',
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
      product_id: 4,
      quantity: 8,
    },
    {
      sale_id: 3,
      product_id: 7,
      quantity: 3,
    },
    {
      sale_id: 5,
      product_id: 8,
      quantity: 5,
    },
    ], { timestamps: false });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
}