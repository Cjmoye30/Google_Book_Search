const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get single user by either their ID or username
    me: async (parent, args, context) => {
      const user = User.findOne({ _id: context._id });
      console.log(user)
      return user;
    }
  },

  Mutation: {
    // create a user, sign a token, and send back
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        console.log(user);
        const token = signToken(user);
        console.log(token)
        return { token, user }

    },

    // login a user, sign a token, and send back
    login: async (parent, { email, password }) => {
      const user = findOne({ email });
      console.log(user)

      if (!user) {
        throw AuthenticationError("Could not find that email bro")
      }

      const token = signToken(user)
      console.log(token);
      return { token, user }
    },

    // save book
    saveBook: async (parent, args, context) => {
      try {
        const newBook = findOneAndUpdate(
          { _id: context._id },
          // this criteria is what we defined in the typeDefs and we are using dot notation to access it
          { $addToSet: { savedBooks: args.criteria } },
          // return the new verision of the user which shows that the book is svaed
          { new: true }
        )
        console.log(newBook)
        return newBook
      }
      catch (err) {
        console.log("Error saving the book!")
      }
    },

    // delete book
    deleteBook: async (parent, bookId, context) => {

      try {
        const deletedBook = User.findOneAndUpdate(
          {_id: context._id},
          {$pull: {savedBooks: bookId}},
          {new: true}
          
        )
        console.log(deletedBook)
        return deletedBook;

      } catch (err) {
        console.log("Error removing the book!")

      }
    }
  }
}

module.exports = resolvers;