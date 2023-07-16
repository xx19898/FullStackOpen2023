const {ApolloServer} = require('@apollo/server');
const {disconnectDB, connectDB, resetDB} = require('../../database/database');
const {startServer} = require('../../library-backend');
const {getScope, verifyToken} = require('../../auth/authUtility');
const {typeDefs} = require('../../graphql/types');
const {resolvers} = require('../../graphql/resolvers');

const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('supertest')('http://localhost:5000');


let token = '';

describe.only('testing that books related db queries function as they should',
    function(done) {
      this.timeout(15000);
      before( async function() {
        startServer(5000);
        await disconnectDB();
        await connectDB();
        await resetDB();

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

        token = response.body.singleResult.data.login.token;
      });

      it('adding new book works as it should', async function() {

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
        assert.exists(authorId);

        const addBookMutationString = `mutation {
          addBook(
            title: "Test Title",
            authorId: "${authorId}",
            published:1993,
            genres: ["classic","drama"]
            )
            {
              title,
              published,
              author{name, born},
              genres,
              _id
            }}`;
        const createBookResponse = await request
            .post('/')
            .send({
              query: addBookMutationString,
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then((res, err) => {
              return JSON.parse(res.text);
            });
        const newBook = createBookResponse.data.addBook;
        assert.equal(newBook.title, 'Test Title');
        assert.equal(newBook.published, '1993');
        assert.deepEqual(newBook.genres, ['classic', 'drama']);
        assert.equal(newBook.author.name, 'testAuthor');
        assert.equal(newBook.author.born, '1992');
      });
    });
