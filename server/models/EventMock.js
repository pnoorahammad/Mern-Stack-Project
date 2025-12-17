const { MockEvent, initializeMockData } = require('../mockData');

// Initialize mock data on first load
let initialized = false;
if (!initialized) {
  initializeMockData();
  initialized = true;
}

// Mock Event model that mimics Mongoose model
class EventMock {
  constructor(data) {
    Object.assign(this, data);
  }

  async save() {
    if (!this._id) {
      // New event
      const event = await MockEvent.create(this);
      Object.assign(this, event);
      return this;
    } else {
      // Update existing
      const event = await MockEvent.findById(this._id);
      if (event) {
        Object.assign(event, this);
        event.updatedAt = new Date();
      }
      return this;
    }
  }

  async populate(fields) {
    // Mock populate - fetch related data
    const { mockUsers } = require('../mockData');
    
    // Handle both string and array inputs
    const fieldArray = typeof fields === 'string' ? [fields] : fields;
    
    if (fieldArray.includes('creator') || fieldArray.some(f => f === 'creator' || (typeof f === 'string' && f.includes('creator')))) {
      const creator = mockUsers.find(u => u._id.toString() === this.creator.toString());
      if (creator) {
        this.creator = {
          _id: creator._id,
          name: creator.name,
          email: creator.email
        };
      }
    }
    
    if (fieldArray.includes('attendees') || fieldArray.some(f => f === 'attendees' || (typeof f === 'string' && f.includes('attendees')))) {
      this.attendees = this.attendees.map(attendeeId => {
        const attendee = mockUsers.find(u => u._id.toString() === attendeeId.toString());
        if (attendee) {
          return {
            _id: attendee._id,
            name: attendee.name,
            email: attendee.email
          };
        }
        return attendeeId;
      });
    }
    
    return this;
  }

  static async find(query = {}) {
    const events = await MockEvent.find(query);
    return events.map(e => new EventMock(e));
  }

  static async findById(id) {
    const event = await MockEvent.findById(id);
    if (event) {
      return new EventMock(event);
    }
    return null;
  }

  static async findByIdAndDelete(id) {
    return await MockEvent.findByIdAndDelete(id);
  }

  static async updateOne(query, update) {
    return await MockEvent.updateOne(query, update);
  }
}

module.exports = EventMock;

