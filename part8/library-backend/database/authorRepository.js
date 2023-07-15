const {Author} = require('./AuthorSchema');

async function updateAuthor(newUser) {
  const newUserWithoutVKey = newUser;
  delete newUserWithoutVKey['__v'];
  console.log({newUserWithoutVKey});
  return await Author.findOneAndReplace({
    _id: newUser._id,
    born: newUser.born,
    name: newUser.name,
  });
}

async function deleteAllAuthors() {
  return await Author.deleteMany({});
}

async function createNewAuthor(newAuthor) {
  return await Author.create({name: newAuthor.name, born: newAuthor.born});
}


module.exports = {updateAuthor, deleteAllAuthors, createNewAuthor};
