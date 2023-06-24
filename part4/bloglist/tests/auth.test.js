const { app } = require("..");
const { deleteUserByName, connectDB, disconnectDB, deleteUsers, deleteBlogs, getUserByName } = require("../mongo")

const request = require('supertest');

/*
describe('testing that registration of newUsers works as it should',() => {
    afterEach(async() => {
        console.log('done did it')
    })
    beforeAll(async () => {
        await connectDB('test')
    })
    afterAll(async () => {
        await disconnectDB()
    })
    test('server should not accept userdata with no username', async () => {
        const response = await request(app).post('/api/users').send({password:'xddd'})
        expect(response.statusCode).toBe(400)
    })
    test('server should not accept userdata with no password',async () => {
        const response = await request(app).post('/api/users').send({username:'xesewr'})
        expect(response.statusCode).toBe(400)
    })
    test('server should not accept too short password',async () => {
        const response = await request(app).post('/api/users').send({username:'xesewr',password:'xd'})
        expect(response.statusCode).toBe(400)
    })
    test('server should not accept too short username',async () => {
        const response = await request(app).post('/api/users').send({username:'x',password:'xdsssdf'})
        expect(response.statusCode).toBe(400)
    })
})
*/

describe('testing that registration of newUsers works as it should',() => {
    afterAll(async() => {
        await deleteUsers()
        await deleteBlogs()
        await disconnectDB()
    })
    beforeAll(async () => {
        await connectDB('test')
    })

    test('creating user should work', async () => {
        const response = await request(app).post('/api/users').send({password:'xddd',username:'testUser',name:'Adam'})
        expect(response.statusCode).toBe(201)
    })

    test.only('created user exists inside database', async () => {
        const user = await getUserByName('testUser')
        expect(user.name).toBe('Adam')
    })

    test('should be able to login with right credentials',async() => {
        const response = await request(app).post('/api/users/login').send({username:'testUser',password:'xddd'})
        console.log({response})
        expect(response.statusCode).toBe(200)
    })
})