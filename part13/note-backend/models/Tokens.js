const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../util/db.js')

const Users = require('./Users')

class Tokens extends Model {}

Tokens.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'}
    },
    active: {
        type:DataTypes.BOOLEAN,
        defaulValue: true,
        allowNull:false,
    }
},{
    sequelize,
    underscored: true,
    modelName: 'tokens',
    timestamps: false,
})

module.exports = Tokens