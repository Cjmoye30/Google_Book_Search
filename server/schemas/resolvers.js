// Resolvers define how the server should respond to GraphQL queries and mutations defind in the typeDefs

// Requiring the models we are going to be using
const { Query } = require('mongoose');
const {User} = require('../models');

Query: {
    // get single user by either their ID or username
    singleUser: async (parent, { user = null, params}) => {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
          });
          if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
          }
          res.json(foundUser);
    }
}

Mutation: {
    // create a user, sign a token, and send back
    createUser: async(parent, {body}) => {
        const user = await User.create(body);

        if (!user) {
          return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        res.json({ token, user });

    }
    
    // login a user, sign a token, and send back
    login: async(parent, {body}) => {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
          return res.status(400).json({ message: "Can't find this user" });
        }
    
        const correctPw = await user.isCorrectPassword(body.password);
    
        if (!correctPw) {
          return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    }
    
    // save book
    saveBook: async(parent, {user, body}) => {
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

    }
    
    // delete book
    deleteBook: async(parent, {user, params}) => {
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