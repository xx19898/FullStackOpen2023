const expect = require('chai').expect;
const {Author} = require('../../database/AuthorSchema');
const {
  updateAuthor,
  createNewAuthor} = require('../../database/authorRepository');
const {resetDB, connectDB} = require('../../database/database');

describe('testing author db queries', () => {
  before(async () => {
    await connectDB();
    await resetDB();
  }),

  it('', async () => {
    const author = await Author.create({
      name: 'Author',
    });

    author.born = 1990;

    const updatedAuthor = await updateAuthor(author);


    const authors = await Author.find({});

    const authorFromDb = await Author.findOne({_id: author._id});


    expect(authorFromDb.name).equals('Author');
  });

  it('creating new authors functions', async () => {
    const newAuthor = {name: 'testAuthor2', born: 1992};
    await createNewAuthor(newAuthor);
    const authorFromDb = await Author.findOne({name: newAuthor.name});

    expect(authorFromDb.name).equals(newAuthor.name);
    expect(authorFromDb.born).equals(newAuthor.born);
  });
});
