const router = require('express').Router()

const { Users, Blogs } = require('../models/')

router.get('/', async (req,res) => {
    const users = await Users.findAll({include:{
        model: Blogs,
        as: 'blogs'
    }})
    res.send(users)
})

router.post('/', async ({body},res) => {

    const user = await Users.create({
        username: body.username,
        name: body.name,
    })

    res.send(user)
})

router.put('/:username', async (req,res) => {
    const username = req.params.username
    const newUsername = req.body.newUsername
    const updatedUsers = await Users.update({username:newUsername},{
        where:{
            username:username,
        }
    })
    return updatedUsers
})


module.exports = router
