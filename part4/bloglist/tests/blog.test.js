const { createNewBlog } = require("../blogHandlers")
const { deleteUsers, deleteBlogs, disconnectDB, connectDB } = require("../mongo")
const { app } = require("..");
const mongoose = require('mongoose')
const request = require('supertest');

describe('testing api functionality related to blog creation and retrieval',() => {
    afterAll(async () => {
        await deleteUsers()
        console.log('DELETED USERS')
        await deleteBlogs()
        await mongoose.disconnect()
        console.log('FINISHED WITH BLOG TESTS')
    })
    beforeAll(async () => {
        await connectDB()
        const user = await request(app).post('/api/users').send({password:'xddd',username:'testUser',name:'Adam'})
    })

    test.only('should be able to create blog when using correct token',async() => {
        let response = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})
        response = await request(app).post('/api/blogs',createNewBlog).set('Authorization',`Bearer ${response.body.token}`).send({blog:{title:'First Blog',author:'random user',url:'xx',likes:15}})
        expect(response.statusCode).toBe(201)
    })



    test('should be able to delete blog with right token',async () => {
        let token = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'}).body.token
        let response = await request(app)
        .post('/api/blogs',createNewBlog)
        .set('Authorization',`Bearer ${token}`)
        .send({token:token,blog:{title:'First Blog',author:'random user',url:'xx',likes:15}})
        expect(response.status).toBe(201)
    })
})