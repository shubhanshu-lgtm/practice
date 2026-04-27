const { User } = require('../models');
const jwt = require('jsonwebtoken');

class AuthService {
  static generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

  static async register({ name, email, password, role }) {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      const error = new Error('User already exists');
      error.status = 400;
      throw error;
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: this.generateToken(user.id),
    };
  }

  static async login({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (user && (await user.comparePassword(password))) {
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: this.generateToken(user.id),
      };
    } else {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }
  }

  static async getProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
    return user;
  }
}

module.exports = AuthService;
