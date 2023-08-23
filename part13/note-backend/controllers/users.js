const router = require('express').Router()

const { Users, Blogs } = require('../models/')

router.get('/', async (req,res) => {
    const users = await Users.findAll({include:{
        model: Blogs,
        as: 'blogs'
    }})
    res.send(users)
})

router.get('/:id', async (req,res) => {
    const isReadCrit = req.query.read
    if(isReadCrit){
        const user = await Users.findByPk(req.params.id,{attributes:{
            id:true,
            username:true,
            name:true,
            password:false,
        } ,include:{model:Blogs,as: 'readList',through:{where:{
            isRead: isReadCrit
        },attributes:['isRead','id']}}})
        res.send(user)
    }else{
        const user = await Users.findByPk(req.params.id,{attributes:{
            id:true,
            username:true,
            name:true,
            password:false,
        } ,include:{model:Blogs,as: 'readList',through:{attributes:['isRead','id']}}})
        res.send(user)
    }
})

router.post('/', async ({body},res) => {
    try{
        const user = await Users.create({
            username: body.username,
            name: body.name,
            password: body.password,
        })

        res.send(user)
    }catch(e){
        console.log({e})
    }
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
