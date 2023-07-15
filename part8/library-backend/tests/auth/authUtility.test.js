const {
  encryptPassword,
  comparePasswords,
  createJWTToken,
  verifyToken} = require('../../auth/authUtility');

const expect = require('chai').expect;


describe('testing auth utility', () => {
  it('Password gets hashed correctly', async () => {
    const testPassword = 'testPassword';
    const encryptedPassword = await encryptPassword(testPassword);
    const compare = await comparePasswords(testPassword, encryptedPassword);
    expect(compare).to.equal(true);
  });

  it(
      'Correct token gets generated and can be decoded correctly',
      async () => {
        const testToken = await createJWTToken('testUser');
        const payload = await verifyToken({
          username: 'testUser', token: testToken,
        });
        expect(payload).to.not.equal(undefined);
      });
});
