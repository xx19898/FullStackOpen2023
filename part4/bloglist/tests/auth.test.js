const { default: mongoose } = require("mongoose");
const { app } = require("..");
const { deleteUserByName, connectDB, disconnectDB, deleteUsers, deleteBlogs, getUserByName } = require("../mongo")
const chai = require('chai')
const request = require('supertest');
const process = require('process')


describe('testing that registration and authentication of newUsers works as it should',() => {

    after(async() => {
        await deleteBlogs()
        await deleteUsers()
        await disconnectDB()
    })

    before(async () => {
        await connectDB()
    })

    it('creating user should work', async () => {
        const response = await request(app).post('/api/users').send({password:'xddd',username:'testUser',name:'Adam'})
        chai.expect(response.statusCode).to.equal(201)
    })

    it('created user exists inside database', async () => {
        const user = await getUserByName('testUser')
        chai.expect(user.name).to.equal('Adam')
    })

    it('should be able to login with right credentials',async() => {
        const response = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})
        chai.expect(response.statusCode).to.equal(200)
    })
})