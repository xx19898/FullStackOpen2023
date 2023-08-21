const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blogs extends Model {}

Blogs.init({
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
    }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blogs'
})

module.exports = Blogs
