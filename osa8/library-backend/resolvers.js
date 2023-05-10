const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { ObjectId } = require('mongodb')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        console.log(args)
        if (!args.author && !args.genre) {
          return Book.find({})
        }
  
        if (args.genre === 'all') {
          return Book.find({})
        }
        // oleteteaan, tehtävässä haetaan sitä, että molemmat argumentit antaessa palautetaan
        // ne oliot, jotka toteuttaa sekä author että genre parametrien arvot
        if (args.author && args.genre) {
          // katotaan eka authori
          let author = await Author.findOne({ name: args.author });
          const authorId = new ObjectId(author.id);
          // etsitään authorin id:llä kirja Bookista
          const books = await Book.find({ author: authorId.toString() })
          console.log(books.filter(b => b.genres.includes(args.genre)))
          return books.filter(b => b.genres.includes(args.genre))
        }
  
        if (args.author) {
          // haetaan authorin id
          let res
          let author = await Author.findOne({ name: args.author });
          const authorId = new ObjectId(author.id);
          // etsitään authorin id:llä kirja Bookista
          res = await Book.find({ author: authorId.toString() })
          return res
        }
  
        if (args.genre) {
          const books = await Book.find({ genres: args.genre });
          //console.log(books)
          return books;
        }
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
    
    },
    Author: {
      bookCount: async (root) => {
        //console.log(name)
        //console.log("B", root)
        const authorId = new ObjectId(root.id);
        
      let pituus = 0;
      try {
        pituus = await Book.find({ author: authorId.toString() }).countDocuments();
        //console.log(pituus)
        return pituus
      } catch (err) {
        console.error(err);
        return null;
      }
        }
      },
    Book: {
      author: async (root) => {
        const authorId = new ObjectId(root.author);
        try {
          const auth = await Author.findOne({ _id: authorId });
          return {
            id: auth._id,
            name: auth.name,
            born: auth.born,
            bookCount: auth.bookCount
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        if (args.title.length < 5 || args.author.length < 4) {
          throw new GraphQLError('Title or author too short', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
  
      let author = await Author.findOne({ name: args.author });
      //console.log("!", author)
      
      if (!author) {
        const newAuth = new Author({name: args.author, born: null})
        //console.log(newAuth)
        await newAuth.save()
        author = newAuth
      }
      
      const book = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres
      })
        try {
          //console.log(book)
          await book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        console.log(book)
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
      editAuthor: async (root, args, context) => {
  
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        const author = await Author.findOne({name: args.name})
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        //console.log(author)
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving editAuth failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
  }
  

module.exports = resolvers