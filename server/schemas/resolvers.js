const { User } = require('../models');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query:{
        getAllUsers: async () => {
            return User.find();
        },
       me: async (parent, args, context) => {
        const foundUser = await User.findById(context.user._id);

        if (!foundUser) {
          throw new AuthenticationError("No user with this id");
        }
  
        return foundUser;
      },
    },

    Mutation: {
        addUser: async (parent, { userrname, email, password }) => {
            return User.create({username, email, password});
        },

    loginUser: async (parent, {email, password}) => {
        const user= await User.findOne({email});

        if(!user) { throw new AuthenticationError('Incorrect email or passoword');
        }
        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw) {throw new AuthenticationError('Incorrect email or password');
    }
    const token = signToken(user);
    return {token,user};
    },

    saveBook: async (parent, { book }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: book }},
                {new: true}
            );
            return updatedUser;
        },
    
    removeBook: async (parent, {bookId}, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
        
        if (!updatedUser) {
        throw new AuthenticationError('You need to be logged in!');
    }
    return updatedUser;
        },
    },
};

module.exports = resolvers;