const { app } = require("..");
const request = require('supertest');
const { connectDB, disconnectDB } = require("../mongo");



describe('testing that validation of user input when trying to login is correct',() => {
    beforeAll(async () => {
        await connectDB()
    })

    afterAll(async () => {
        //await disconnectDB()
        console.log('finished')
    })

    test('server should not accept userdata with no username', async () => {
        const response = await request(app).post('/api/users/login').send({password:'xddd'})
        expect(response.statusCode).toBe(400)
    })

    
    test('server should not accept userdata with no password',async () => {
        const response = await request(app).post('/api/users/login').send({username:'xesewr'})
        expect(response.statusCode).toBe(400)
    })
    test('server should not accept too short password',async () => {
        const response = await request(app).post('/api/users/login').send({username:'xesewr',password:'xd'})
        expect(response.statusCode).toBe(400)
    })
    test('server should not accept too short username',async () => {
        const response = await request(app).post('/api/users/login').send({username:'x',password:'xdsssdf'})
        expect(response.statusCode).toBe(400)
    })
    
})