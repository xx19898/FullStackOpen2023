const { Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const connectDb = async () => {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }

connectDb()

const Blog = sequelize.define('blogs', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    author: DataTypes.STRING,
    url: {
        type:DataTypes.STRING,
        allowNull:false
    },
    title: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }},{
        timestamps: false,
    });
sequelize.sync()
module.exports = {Blog}