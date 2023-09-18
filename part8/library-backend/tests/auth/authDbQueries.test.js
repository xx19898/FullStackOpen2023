const {getUserByUsername} = require('../../database/authRepository');
const {connectDB, resetDB, disconnectDB} = require('../../database/database');
const expect = require('chai').expect;

describe('auth database queries work correctly', () => {
  before(async () => {
    await connectDB();
    await resetDB();
  });
  after(async () => {
    await disconnectDB();
  });
  it('user gets created and queried correctly', async () => {
    const user = await getUserByUsername({username: 'testUser'});
    expect(user.username).to.equal('testUser');
  });
});
