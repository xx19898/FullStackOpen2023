
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcryptjs');

async function encryptPassword(passwordString) {
  const secret = process.env.JWT_SECRET;
  console.log();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passwordString, salt);
  return hash;
}

async function comparePasswords(stringPassword, hash) {
  return bcrypt.compare(stringPassword, hash);
}

async function createJWTToken(username) {
  const secret = process.env.JWT_SECRET;
  console.log({creationSecret: secret});
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: {username: username},
  }, secret);
  return token;
}

async function verifyToken({username, token}) {
  const secret = process.env.JWT_SECRET;
  console.log({token: token});
  const payload = await checkPayloadAndVerify({
    username: username,
    token: token,
    secret: secret,
  });
  console.log({payload});
  return payload;
}

function getScope(req) {
  const authorizationString = req.headers.Authorization;
  if (!authorizationString) return 'GUEST';
  const authStringSplit = authorizationString.split(' ');
  if (authStringSplit.length != 2) {
    throw new GraphQlError('Invalid Authorization header', {
      extensions: {
        code: 'BAD_REQUEST',
      },
    });
  };
  const token = authStringSplit[2];
  const secret = process.env.JWT_SECRET;
  try {
    jwt.verify(token, secret);
    return 'USER';
  } catch (e) {
    throw new GraphQlError('Invalid Authorization header', {
      extensions: {
        code: 'BAD_REQUEST',
      },
    });
  }
}

async function checkPayloadAndVerify({username, token, secret}) {
  try {
    console.log({token});
    console.log({secret});
    const payload = jwt.verify(token, secret);
    console.log({payload});
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
