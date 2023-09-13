const { createNewBlogHandler, deleteBlogHandler } = require("../blogHandlers")
const { deleteUsers, deleteBlogs, disconnectDB, connectDB } = require("../mongo")
const { app } = require("..");
const mongoose = require('mongoose')
const request = require('supertest')
var chai = require('chai')

describe('testing api functionality related to blog creation,retrieval and deletion',() => {
    after(async () => {
        await deleteUsers()
        await deleteBlogs()
        await mongoose.disconnect()
    })
    before(async () => {
        await disconnectDB()
        await connectDB()
        const user = await request(app).post('/api/users').send({password:'xddd',username:'testUser',name:'Adam'})
        const secUser = await request(app).post('/api/users').send({password:'xddd',username:'testUser2',name:'Evan'})
    })

    it('should be able to create blog when using correct token',async() => {
        let response = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})
        response = await request(app)
        .post('/api/blogs',createNewBlogHandler)
        .set('Authorization',`Bearer ${response.body.token}`)
        .send({blog:{title:'First Blog',author:'testUser', url:'xx',likes:15}})
        chai.expect(response.statusCode).to.equal(201)
        await deleteBlogs()
    })

    it('should not be able to delete blog if trying to delete other user\'s blog', async () => {
        let firstLoginResponse = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})

        const createBlogResponse = await request(app)
        .post('/api/blogs',createNewBlogHandler)
        .set('Authorization',`Bearer ${firstLoginResponse.body.token}`)
        .send({blog:{title:'First Blog',author:'OtherPerson', url: 'xx', likes:15 }})
        chai.expect(createBlogResponse.statusCode).to.equal(201)
        const createdBlogId = createBlogResponse._body._id


        let secondLoginResponse = await request(app).post('/api/users/login').send({username:'testUser2',password:'xddd'})

        const deleteBlogResponse = await request(app)
        .delete('/api/blogs',deleteBlogHandler)
        .set('Authorization',`Bearer ${secondLoginResponse.body.token}`)
        .send({blogId:createdBlogId})

        console.log({statusCode:deleteBlogResponse.statusCode})
        chai.expect(deleteBlogResponse.statusCode).to.equal(400)
        await deleteBlogs()
    })

    it('should be able to delete blog with right token',async () => {
        let firstLoginResponse = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})

        const createBlogResponse = await request(app)
        .post('/api/blogs',createNewBlogHandler)
        .set('Authorization',`Bearer ${firstLoginResponse.body.token}`)
        .send({blog:{title:'First Blog',author:'OtherPerson', url: 'xx', likes:15 }})
        chai.expect(createBlogResponse.statusCode).to.equal(201)
        const createdBlogId = createBlogResponse._body._id

        const deleteBlogResponse = await request(app)
        .delete('/api/blogs',deleteBlogHandler)
        .set('Authorization',`Bearer ${firstLoginResponse.body.token}`)
        .send({blogId:createdBlogId})

        console.log({statusCode:deleteBlogResponse.statusCode})
        chai.expect(deleteBlogResponse.statusCode).to.equal(200)
        await deleteBlogs()
    })

    it('if no token attached to blog creating request, operation is unauthorized',async () => {
        const createBlogResponse = await request(app)
            .post('/api/blogs',createNewBlogHandler)
            .send({blog:{title:'First Blog',author:'OtherPerson', url: 'xx', likes:15 }})
        chai.expect(createBlogResponse.statusCode).to.equal(401)
    })
})