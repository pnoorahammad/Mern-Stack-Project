const bcrypt = require('bcryptjs');
const { MockUser, initializeMockData } = require('../mockData');

// Initialize mock data on first load
let initialized = false;
if (!initialized) {
  initializeMockData();
  initialized = true;
}

// Mock User model that mimics Mongoose model
class UserMock {
  constructor(data) {
    Object.assign(this, data);
  }

  async save() {
    if (!this._id) {
      // New user - hash password and create
      this.password = await bcrypt.hash(this.password, 10);
      const user = await MockUser.create({
        name: this.name,
        email: this.email,
        password: this.password
      });
      Object.assign(this, user);
      return this;
    } else {
      // Update existing
      const user = await MockUser.findById(this._id);
      if (user) {
        Object.assign(user, this);
        user.updatedAt = new Date();
      }
      return this;
    }
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  toObject() {
    const obj = { ...this };
    delete obj.password;
    return obj;
  }

  select(fields) {
    // Mock select - just return this
    return this;
  }

  static async findOne(query) {
    return await MockUser.findOne(query);
  }

  static async findById(id) {
    const user = await MockUser.findById(id);
    if (user) {
      const userObj = new UserMock(user);
      return userObj;
    }
    return null;
  }

  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await MockUser.create({
      ...data,
      password: hashedPassword
    });
    return new UserMock(user);
  }
}

module.exports = UserMock;

