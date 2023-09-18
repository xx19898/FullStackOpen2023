const { default: mongoose } = require("mongoose");
const { app } = require("..");
const { deleteUserByName, connectDB, disconnectDB, deleteUsers, deleteBlogs, getUserByName } = require("../mongo")

const request = require('supertest');
const process = require('process')


describe('testing that registration and authentication of newUsers works as it should',() => {

    afterAll(async() => {
        await deleteBlogs()
        await deleteUsers()
        //await disconnectDB()
    })

    beforeAll(async () => {
        await connectDB()
    })

    test('creating user should work', async () => {
        const response = await request(app).post('/api/users').send({password:'xddd',username:'testUser',name:'Adam'})
        expect(response.statusCode).toBe(201)
    })

    test('created user exists inside database', async () => {
        const user = await getUserByName('testUser')
        expect(user.name).toBe('Adam')
    })

    test('should be able to login with right credentials',async() => {
        const response = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})
        expect(response.statusCode).toBe(200)
    })
})