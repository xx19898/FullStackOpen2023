const {
  encryptPassword,
  comparePasswords,
  createJWTToken,
  verifyToken} = require('../auth/authUtility');


describe.only('testing auth utility', () => {
  test('Password gets hashed correctly', async () => {
    const testPassword = 'testPassword';
    const encryptedPassword = await encryptPassword(testPassword);
    console.log({encryptedPassword});
    const compare = await comparePasswords(testPassword, encryptedPassword);
    expect(compare).toBe(true);
  });

  test.only(
      'Correct token gets generated and can be decoded correctly',
      async () => {
        const testToken = await createJWTToken('testUser');
        const payload = await verifyToken({
          username: 'testUser', token: testToken,
        });
        expect(payload).not.toBe(undefined);
      });
});
