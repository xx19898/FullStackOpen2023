const {ApolloServer} = require('@apollo/server');
const {disconnectDB, connectDB, resetDB} = require('../../database/database');
const {startServer} = require('../../library-backend');
const {getScope, verifyToken} = require('../../auth/authUtility');
const {typeDefs} = require('../../graphql/types');
const {resolvers} = require('../../graphql/resolvers');

const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('supertest')('http://localhost:5000');


describe.only('testing that books related db queries function as they should',
    () => {
      before(async () => {
        startServer(5000);
        await disconnectDB();
        await connectDB();
        await resetDB();
      });

      it('adding new book works as it should', async (done) => {
        const testServer = new ApolloServer({
          typeDefs: typeDefs,
          resolvers: resolvers,
          context: (req) => getScope(req),
        });


        // eslint-disable-next-line no-multi-str
        const loginMutationString = `mutation login($username: String!, $password: String!){ login(username: $username, password: $password){token}}`;
        const response = await testServer.executeOperation({
          query: loginMutationString,
          variables: {username: 'testUser', password: 'testPassword'},
        });

        const token = response.body.singleResult.data.login.token;

        const payload = await verifyToken({
          username: 'testUser',
          token: token});

        const username = payload.data.username;
        expect(username).to.equal('testUser');

        const addAuthorMutationString = `mutation { addAuthor(name: "testAuthor", born: 1992){ name, born, _id }}`;

        const res = await request
            .post('/')
            .send({
              query: addAuthorMutationString,
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => res.body);

        const authorId = res.data.addAuthor._id;
        console.log({authorId});
        assert.exists(authorId);

        const addBookMutationString = `mutation { addBook(title: "Test Title", authorId: "${authorId}", published:1993, genres: ["classic","drama"]){title, published, author{name, born}, genres}}`;
        console.log({addBookMutationString});
        const createBookResponse = await request
            .post('/')
            .send({
              query: addBookMutationString,
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then((res,err) => {
                return {res,err};
                });

        console.log(JSON.stringify(createBookResponse,null,2));
      });
    });
