const {ApolloServer} = require('@apollo/server');
const {connectDB, resetDB, disconnectDB} = require('../../database/database');
const {typeDefs} = require('../../graphql/types');
const {resolvers} = require('../../graphql/resolvers');
const {verifyToken, getScope} = require('../../auth/authUtility');
const {startServer} = require('../../library-backend');

const expect = require('chai').expect;
const request = require('supertest')('http://localhost:5000');

describe('authors related api functions correctly', (done) => {
  before(async () => {
    await disconnectDB();
    await connectDB();
    await resetDB();
    startServer(5000);
  });
  it('adding new author works as it should', async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
      context: (req) => getScope(req),
    });


    // eslint-disable-next-line max-len
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

    // eslint-disable-next-line max-len
    const addAuthorMutationString = `mutation { addAuthor(name: "testAuthor", born: 1992){ name, born }}`;

    const res = await request
        .post('/')
        .send({
          query: addAuthorMutationString,
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200).then((res, req) => res.body.data );
    console.log({res});
  });
});
