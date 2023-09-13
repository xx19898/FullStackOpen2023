const { app } = require("..");
const request = require('supertest');
const { connectDB, disconnectDB } = require("../mongo");
const chai = require('chai')


describe('testing that validation of user input when trying to login is correct',() => {
    before(async () => {
        await connectDB()
    })

    after(async () => {
        await disconnectDB()
    })

    it('server should not accept userdata with no username', async () => {
        const response = await request(app).post('/api/users/login').send({password:'xddd'})
        chai.expect(response.statusCode).to.equal(400)
    })


    it('server should not accept userdata with no password',async () => {
        const response = await request(app).post('/api/users/login').send({username:'xesewr'})
        chai.expect(response.statusCode).to.equal(400)
    })

    it('server should not accept too short password',async () => {
        const response = await request(app).post('/api/users/login').send({username:'xesewr',password:'xd'})
        chai.expect(response.statusCode).to.equal(400)
    })

    it('server should not accept too short username',async () => {
        const response = await request(app).post('/api/users/login').send({username:'x',password:'xdsssdf'})
        chai.expect(response.statusCode).to.equal(400)
    })
})