const {Author} = require('./AuthorSchema');

async function updateAuthor(newUser, setBornTo) {
  console.log({setBornTo, userToUpdate: newUser});
  const newUserWithoutVKey = newUser;
  delete newUserWithoutVKey['__v'];
  return await Author.findOneAndReplace({
    _id: newUser.id,
  },
  {
    born: setBornTo,
    name: newUser.name,
  });
}

async function getAllAuthors() {
  return await Author.find({});
}

async function deleteAllAuthors() {
  return await Author.deleteMany({});
}

async function createNewAuthor(newAuthor) {
  return await Author.create({name: newAuthor.name, born: newAuthor.born});
}


module.exports = {
  updateAuthor,
  getAllAuthors,
  deleteAllAuthors,
  createNewAuthor,
};
