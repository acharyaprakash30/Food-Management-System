const bcrypt = require('bcryptjs');
const { queryInterface } = require('sequelize');
const { Admin } = require('../models'); // Replace with your Admin model import

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Generate a hashed password
        const hashedPassword = await bcrypt.hash('admin123$', 10); // Replace 'adminpassword' with the actual admin password

        // Insert admin details into the database
        await queryInterface.bulkInsert('users', [
            {
                userName: 'prakash',
                email: 'admin@test.com',
                password: hashedPassword,
                phoneNumber: '9847098470',
                address: 'NewYork,USA',
                role: 'admin',
                // image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87M74uZMnhNf_sZBXAm1pIIgKL9lznN_jNX1b7qfxgTz45trmOCYh5e1-6A53A4lynfGjOA&s',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        // Remove the inserted admin details    
        await queryInterface.bulkDelete('Admins', null, {});
    }
};
