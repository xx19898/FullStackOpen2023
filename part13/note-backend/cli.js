const { sequelize} = require('./index.js')
const {QueryTypes} = require('sequelize')


async function printBlogs(){
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT });
    console.log({blogs})
}

printBlogs()