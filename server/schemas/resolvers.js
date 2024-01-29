const { User, Auth } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    user: async (_, { email }) => {
      try {
        const user = await User.findOne({ email });
        return user;
      } catch (error) {
        throw new Error('Error fetching user');
      }
    },
    me: (_, __, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    addUser: async (_, { email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
          email,
          password: hashedPassword,
        });

        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'your-secret-key', { expiresIn: '1h' });

        return { token, user: newUser };
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

        return { token, user };
      } catch (error) {
        throw new Error('Error during login');
      }
    },
  }
};

module.exports = resolvers;
