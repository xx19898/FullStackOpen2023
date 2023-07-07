const { createNewBlogHandler, getUserBlogs, updateBlog } = require("../blogHandlers")
const { deleteUsers, deleteBlogs, disconnectDB, connectDB, getBlogs } = require("../mongo")
const { app } = require("..");
const mongoose = require('mongoose')
const request = require('supertest');

describe('testing api functionality related to blog creation and retrieval',() => {
    afterAll(async () => {
        await deleteUsers()
        console.log('DELETED USERS')
        await deleteBlogs()
        await disconnectDB()
        console.log('FINISHED WITH BLOG TESTS')
    })
    beforeAll(async () => {
        //await disconnectDB()
        await connectDB()
        const user = await request(app).post('/api/users').send({password:'xddd',username:'testUser',name:'Adam'})
    })

    test('should be able to create blog when using correct token',async() => {
        let response = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})
        console.log({response:response.data})
        response = await request(app)
        .post('/api/blogs',createNewBlogHandler)
        .set('Authorization',`Bearer ${response.body.token}`)
        .send({blog:{title:'First Blog',author:'random user',url:'xx',likes:15}})
        expect(response.statusCode).toBe(201)
        await deleteBlogs()
    })

    test('should be able to delete blog with right token',async () => {
        let token = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})
        console.log({tokenResponse:token.body.token})
        let response = await request(app)
        .post('/api/blogs',createNewBlogHandler)
        .set('Authorization',`Bearer ${token.body.token}`)
        .send({token:token.body.token,blog:{title:'First Blog',author:'random user',url:'xx',likes:15}})
        console.log({DELETE_RESPONSE_BODY: response.body})
        expect(response.status).toBe(201)
    })

    test.only('should be able to like blog',async () => {
        let token = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})
        let response = await request(app)
        .post('/api/blogs',createNewBlogHandler)
        .set('Authorization',`Bearer ${token.body.token}`)
        .send({token:token.body.token,blog:{title:'First Blog',author:'random user',url:'xx'}})
        
        expect(response.status).toBe(201)

        response = await request(app).get('/api/blogs',getUserBlogs).set('Authorization',`Bearer ${token.body.token}`)


        const blogId = response._body[0]._id
        const updatedBlog = {...response._body[0],likes: 1}

        expect(response._body.length).toBe(1)
        expect(response._body[0].likes).toBe(undefined)

        response = await request(app)
        .put(`/api/blogs/${blogId}`,updateBlog)
        .set('Authorization',`Bearer ${token.body.token}`)
        .send({blog:updatedBlog})

        expect(response.status).toBe(200)
        

        response = await request(app)
        .get('/api/blogs',getUserBlogs)
        .set('Authorization',`Bearer ${token.body.token}`)

        console.log({body:response._body})
        
        expect(response._body.length).toBe(1)
        expect(response._body[0].likes).toBe(1)
 
        
    })
})