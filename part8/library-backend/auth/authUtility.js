
const jwt = require('jsonwebtoken');
const {GraphQLError} = require('graphql');

require('dotenv').config();

const bcrypt = require('bcryptjs');

async function encryptPassword(passwordString) {
  const secret = process.env.JWT_SECRET;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passwordString, salt);
  return hash;
}

async function comparePasswords(stringPassword, hash) {
  return bcrypt.compare(stringPassword, hash);
}

async function createJWTToken(username) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: {username: username},
  }, secret);
  return token;
}

async function verifyToken({username, token}) {
  const secret = process.env.JWT_SECRET;
  const payload = await checkPayloadAndVerify({
    username: username,
    token: token,
    secret: secret,
  });
  return payload;
}

function getScope(req) {
  const authorizationString = req.headers.authorization;
  if (!authorizationString) return 'GUEST';
  const authStringSplit = authorizationString.split(' ');
  if (authStringSplit.length != 2) {
    throw new GraphQLError('Invalid Authorization header', {
      extensions: {
        code: 'BAD_REQUEST',
      },
    });
  };
  const token = authStringSplit[1];
  const secret = process.env.JWT_SECRET;
  try {
    jwt.verify(token, secret);
    console.log('passed verification');
    return 'USER';
  } catch (e) {
    console.log('caught error when verifying jwt');
    console.log(JSON.stringify(e, null, 2));
    throw new GraphQlError('Invalid Authorization header', {
      extensions: {
        code: 'BAD_REQUEST',
      },
    });
  }
}

async function checkPayloadAndVerify({username, token, secret}) {
  try {
    const payload = jwt.verify(token, secret);
    if (payload.data.username != username) return undefined;
    return payload;
  } catch (e) {
    console.log({e});
    return undefined;
  }
}


module.exports = {
  encryptPassword, comparePasswords,
  verifyToken, createJWTToken, getScope,
};
