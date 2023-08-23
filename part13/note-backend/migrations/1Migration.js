const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({context: queryInterface }) => {
        await queryInterface.createTable('users',{
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            password:{
                type: DataTypes.TEXT,
                allowNull: false,
                len: [6,32],
            },
            username:{
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,
                validate:{
                    isEmail:true,
                }
            },
            name:{
                type: DataTypes.TEXT,
                allowNull: false,
            },
            created_at:{
                type: DataTypes.DATE,
            },
            updated_at: {
                type:DataTypes.DATE,
            }
        })

        await queryInterface.createTable('blogs',{
            id: {
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            author: DataTypes.STRING,
            url: {
                type:DataTypes.STRING,
                allowNull:false,
            },
            title: {
                type:DataTypes.STRING,
                allowNull:false,
            },
            likes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            user_id: {
                type: DataTypes.INTEGER,
                references:{
                    model: {
                        tableName: 'users',
                        schema: 'public'
                    },
                    key: 'id',
                },
                allowNull: false,
            },
        })
    },
    down: async ({context: queryInterface }) => {
        await queryInterface.dropTable('users')
        await queryInterface.dropTable('blogs')
    }
}