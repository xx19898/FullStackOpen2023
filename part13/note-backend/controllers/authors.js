const { Blogs } = require('../models')
const { sequelize } = require('../util/db')

const router = require('express').Router()


router.get('/', async (req,res) => {
    const authors = await Blogs.findAll({
        attributes:['author',[sequelize.fn('SUM', sequelize.col('likes')), 'likes']],
        group: 'author',
        order: [
            ['likes','ASC']
        ]
    })

    res.send(authors)
})

module.exports = router