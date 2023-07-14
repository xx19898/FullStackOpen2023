const {getUserByUsername} = require('../database/authRepository');
const {connectDB, resetDB, disconnectDB} = require('../database/database');

describe('auth database queries work correctly', () => {
  beforeAll(async () => {
    await connectDB();
    await resetDB();
  });
  afterAll(async () => {
    await disconnectDB();
  });
  test('user gets created and queried correctly', async () => {
    const user = await getUserByUsername({username: 'testUser'});
    console.log({user});
    expect(user.username).toBe('testUser');
  });
});
