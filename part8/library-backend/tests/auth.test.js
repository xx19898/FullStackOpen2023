const {ApolloServer} = require('@apollo/server');
const {typeDefs} = require('../graphql/types');
const {verifyToken} = require('../auth/authUtility');
const {resolvers} = require('../graphql/resolvers');
const {disconnectDB, connectDB} = require('../database/database');
const expect = require('chai').expect;


describe('auth functionality works', () => {
  before(async () => {
    await disconnectDB();
    await connectDB();
  });
  it('creating new user works as it should', async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
    });

    // eslint-disable-next-line no-multi-str
    const loginMutationString = `mutation login($username: String!, $password: String!){ login(username: $username, password: $password){token}}`;
    const response = await testServer.executeOperation({
      query: loginMutationString,
      variables: {username: 'testUser', password: 'testPassword'},
    });

    console.log(JSON.stringify(response.body, null, 2));

    const payload = await verifyToken({
      username: 'testUser',
      token: response.body.singleResult.data.login.token});

    console.log({payload});
    const username = payload.data.username;
    expect(username).to.equal('testUser');
  });
});
