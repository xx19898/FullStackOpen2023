const {encryptPassword} = require('../auth/authUtility');
const {User} = require('./AuthSchema');

function deleteAllUsers() {
  return User.deleteMany({});
}

async function createNewUser({username, password}) {
  const encryptedPassword = await encryptPassword(password);
  return User.create({password: encryptedPassword, username: username});
}

async function getPasswordByUsername({username}) {
  const user = await User.findOne({username: username});
  return user.password;
}

async function getUserByUsername({username}) {
  const user = await User.findOne({username: username});
  return user;
}

async function getPasswordById({id}) {
  const user = await User.findOne({_id: username});
  return user.password;
}

module.exports = {
  createNewUser,
  getPasswordById,
  getPasswordByUsername,
  deleteAllUsers,
  getUserByUsername,
};
