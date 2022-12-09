const { User, Book } = require('../models');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query:{
       me: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({})
            .select('-__v -password')
            .populate('books')
            
                return userData;
        }
       } 
    },


    Mutation: {
        createUser: async (parent,args) => {
            const user =await User.create(args);
            const token = singleToken(user);

            return {token,user};
        },

    login: async (parent, {email, password}) => {
        const user= await User.findOne({email});

        if(!user) { throw new AuthenticationError('Incorrect email or passoword');
        }
        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw) {throw new AuthenticationError('Incorrect email or password');
    }
    const token = signToken(user);
    return {token,user};
    },

    saveBook: async (parent, args, context) => {
        if (contect.user) {
            const updateUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: args.input}},
                {new: true}
            );
            return updateUser;
        }
        throw new AuthenticationError('log in first');
    },
    removeBook: async (parent, args, context) => {
        if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
    }
}
};

module.exports = resolvers;