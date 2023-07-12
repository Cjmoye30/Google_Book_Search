const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const {signToken} = require('../utils/auth')

const resolvers = {
  Query: {
    // get single user by either their ID or username
    me: async (parent, args, context) => {
        const user = User.findOne({_id: context._id});
        console.log(user)
        return user;
    }
  },

  Mutation: {
    // create a user, sign a token, and send back
    addUser: async (parent, { username, email, password }) => {

      try {
        console.log(username, eamil, password)
        const user = await User.create({ username, email, password });
        console.log(user)

        const token = signToken(user);
        res.json({ token, user });

      } catch (err) {
        console.log("ERROR FROM RESOLVER", err)
      }
    },

    // login a user, sign a token, and send back
    login: async (parent, { email, password }) => {
      const user = findOne({email});
      console.log(user)

      if(!user) {
        throw AuthenticationError("Could not find that email bro")
      }

      const token = signToken(user)
      console.log(token);
      return {token, user}
    },

    // save book
    saveBook: async (parent, { user, body }) => {
      console.log(user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return res.json(updatedUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }

    },

    // delete book
    deleteBook: async (parent, { user, params }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }
      return res.json(updatedUser);
    }

  }
}

module.exports = resolvers;