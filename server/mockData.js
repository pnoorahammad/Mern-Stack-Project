// Mock Database - In-memory data storage
const mockUsers = [];
const mockEvents = [];
let userIdCounter = 1;
let eventIdCounter = 1;

// Helper to generate ObjectId-like strings
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Mock User operations
const MockUser = {
  findOne: async (query) => {
    if (query.email) {
      return mockUsers.find(u => u.email === query.email) || null;
    }
    if (query._id) {
      return mockUsers.find(u => u._id.toString() === query._id.toString()) || null;
    }
    return null;
  },
  
  findById: async (id) => {
    const user = mockUsers.find(u => u._id.toString() === id.toString());
    return user || null;
  },
  
  create: async (userData) => {
    const newUser = {
      _id: generateId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockUsers.push(newUser);
    return newUser;
  }
};

// Mock Event operations
const MockEvent = {
  find: async (query = {}) => {
    let results = [...mockEvents];
    
    // Filter by date (upcoming events)
    if (query.date && query.date.$gte) {
      results = results.filter(e => new Date(e.date) >= query.date.$gte);
    }
    
    // Filter by search term
    if (query.title && query.title.$regex) {
      const regex = new RegExp(query.title.$regex, query.title.$options || 'i');
      results = results.filter(e => regex.test(e.title));
    }
    
    // Filter by creator
    if (query.creator) {
      results = results.filter(e => e.creator.toString() === query.creator.toString());
    }
    
    // Filter by attendees
    if (query.attendees) {
      results = results.filter(e => 
        e.attendees.some(a => a.toString() === query.attendees.toString())
      );
    }
    
    return results;
  },
  
  findById: async (id) => {
    return mockEvents.find(e => e._id.toString() === id.toString()) || null;
  },
  
  create: async (eventData) => {
    const newEvent = {
      _id: generateId(),
      ...eventData,
      attendees: eventData.attendees || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockEvents.push(newEvent);
    return newEvent;
  },
  
  findByIdAndDelete: async (id) => {
    const index = mockEvents.findIndex(e => e._id.toString() === id.toString());
    if (index !== -1) {
      return mockEvents.splice(index, 1)[0];
    }
    return null;
  },
  
  updateOne: async (query, update) => {
    const event = mockEvents.find(e => {
      if (e._id.toString() !== query._id.toString()) return false;
      
      // Check attendees condition
      if (query.attendees && query.attendees.$ne) {
        if (e.attendees.some(a => a.toString() === query.attendees.$ne.toString())) {
          return false;
        }
      }
      
      // Check capacity condition
      if (query.$expr && query.$expr.$lt) {
        const size = e.attendees.length;
        const capacity = e.capacity;
        if (!(size < capacity)) return false;
      }
      
      return true;
    });
    
    if (event && update.$addToSet) {
      const userId = update.$addToSet.attendees;
      if (!event.attendees.some(a => a.toString() === userId.toString())) {
        event.attendees.push(userId);
        event.updatedAt = new Date();
        return { matchedCount: 1, modifiedCount: 1 };
      }
    }
    
    return { matchedCount: 0, modifiedCount: 0 };
  }
};

// Initialize with sample data
const initializeMockData = () => {
  // Create a sample user
  const sampleUser = {
    _id: generateId(),
    name: 'Demo User',
    email: 'demo@example.com',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', // hashed 'password123'
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockUsers.push(sampleUser);
  
  // Create sample events
  const sampleEvent1 = {
    _id: generateId(),
    title: 'Tech Conference 2024',
    description: 'Join us for an exciting tech conference featuring the latest innovations in web development, AI, and cloud computing.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    location: 'Convention Center, Downtown',
    capacity: 100,
    image: '',
    creator: sampleUser._id,
    attendees: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const sampleEvent2 = {
    _id: generateId(),
    title: 'React Workshop',
    description: 'Hands-on workshop on React.js fundamentals and advanced patterns. Perfect for developers looking to level up their skills.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    location: 'Tech Hub, Innovation District',
    capacity: 50,
    image: '',
    creator: sampleUser._id,
    attendees: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockEvents.push(sampleEvent1, sampleEvent2);
};

// Export
module.exports = {
  MockUser,
  MockEvent,
  initializeMockData,
  mockUsers,
  mockEvents
};

