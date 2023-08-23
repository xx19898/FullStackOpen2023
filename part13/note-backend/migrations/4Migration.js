const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('tokens',{
            id: {
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id'}
            },
            active: {
                type:DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            }
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('tokens')
    }
}