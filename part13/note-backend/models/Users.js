const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

const Blogs  = require('./Blogs.js')
const ReadingLists = require('./ReadingLists')
const Tokens = require('./Tokens')

class Users extends Model {}

Users.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    password:{
        type: DataTypes.TEXT,
        allownNull: false,
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
},
{
    sequelize,
    underscored:true,
    modelName: 'users',
},)

Users.hasMany(Blogs, {as: 'blogs', foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'SET NULL'})

Blogs.belongsTo(Users)

Blogs.belongsToMany(Users,{
    through: 'reading_lists',
    as: 'usersWithBlogInReadList'
})

Users.belongsToMany(Blogs,{
    through: 'reading_lists',
    as: 'readList'
})

Users.hasMany(Tokens,{as: 'tokens',foreignKey:'userId'})

module.exports = Users