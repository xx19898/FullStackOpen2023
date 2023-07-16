
const { Author } = require('./AuthorSchema');
const {Book} = require('./BookSchema');

async function deleteAllBooks() {
  return await Book.deleteMany({});
}

async function createBook({title, authorName, published, genres}) {
  const author = await Author.findOne({name: authorName});

  const createdBook = await Book.create({
    title: title,
    author: author._id,
    published: published,
    genres: genres,
  });

  const populatedBook = await Book
      .findOne({_id: createdBook._id})
      .populate('author');

  return populatedBook;
}

async function getAllBooks(genre) {
  const books = await Book.find({}).populate('author');
  if (genre === undefined) return books;
  const rightBooks = !genre ? books : books.filter((book) => {
    return book.genres.some((booksGenre) => booksGenre === genre);
  });
  return rightBooks;
}

module.exports = {deleteAllBooks, createBook, getAllBooks};
