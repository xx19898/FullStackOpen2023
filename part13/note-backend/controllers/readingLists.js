const router = require('express').Router()

const { where } = require('sequelize')
const { Blogs, Users, ReadingLists } = require('../models/')
const { requireAuthenticationToken } = require('../util/middleware')

router.get('/', async (req,res) => {
    console.log({cols: Users.getAttributes()})
    const userAndReadingList =  await Users.findByPk(
        parseInt(req.body.userId),{
            include:{
                model:Blogs,as:'readList'
            }})
    console.log({userAndReadingList})
    res.send(userAndReadingList)
})

router.put('/:blogId', requireAuthenticationToken, async (req,res) => {
    await ReadingLists.update({isRead:req.body.read},{where:{
        blogId: req.params.blogId,
        userId: req.userId,
    }})
    res.sendStatus(200)
})

router.post('/',requireAuthenticationToken, async (req,res) => {
    const userId = req.userId
    const blogId = parseInt(req.body.blogId)
    const resp = await ReadingLists.create({userId: userId,blogId:blogId})
    res.sendStatus(200)
})

module.exports = router;