const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/EventMock');

// @route   POST /api/rsvp/:eventId
// @desc    RSVP to an event
// @access  Private
router.post('/:eventId', auth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    // Find event
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event is in the past
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({ message: 'Cannot RSVP to past events' });
    }

    // Check if user already RSVP'd
    if (event.attendees.some(attendee => attendee.toString() === userId.toString())) {
      return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
    }

    // Check capacity
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is at full capacity' });
    }

    // Atomic update: Add user to attendees array only if capacity allows
    // Mock implementation - in real MongoDB this would be atomic
    const updateResult = await Event.updateOne(
      { 
        _id: eventId,
        attendees: { $ne: userId }, // User not already in attendees
        $expr: { $lt: [{ $size: '$attendees' }, '$capacity'] } // Capacity check
      },
      { 
        $addToSet: { attendees: userId } // $addToSet prevents duplicates
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(400).json({ 
        message: 'Could not RSVP. Event may be at capacity or you may have already RSVP\'d.' 
      });
    }

    // Fetch updated event
    const updatedEvent = await Event.findById(eventId);
    if (updatedEvent) {
      await updatedEvent.populate('creator');
      await updatedEvent.populate('attendees');
    }

    res.json({ 
      message: 'Successfully RSVP\'d to event',
      event: updatedEvent
    });
  } catch (error) {
    console.error('RSVP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/rsvp/:eventId
// @desc    Cancel RSVP to an event
// @access  Private
router.delete('/:eventId', auth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has RSVP'd
    if (!event.attendees.some(attendee => attendee.toString() === userId.toString())) {
      return res.status(400).json({ message: 'You have not RSVP\'d to this event' });
    }

    // Remove user from attendees
    event.attendees = event.attendees.filter(
      attendee => attendee.toString() !== userId.toString()
    );
    await event.save();

    const updatedEvent = await Event.findById(eventId);
    if (updatedEvent) {
      await updatedEvent.populate('creator');
      await updatedEvent.populate('attendees');
    }

    res.json({ 
      message: 'Successfully cancelled RSVP',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Cancel RSVP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/rsvp/user
// @desc    Get all events user has RSVP'd to
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    let events = await Event.find({ 
      attendees: req.user._id,
      date: { $gte: new Date() }
    });
    
    // Populate and sort
    for (let event of events) {
      await event.populate('creator');
      await event.populate('attendees');
    }
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(events);
  } catch (error) {
    console.error('Get user RSVPs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/rsvp/user/created
// @desc    Get all events created by user
// @access  Private
router.get('/user/created', auth, async (req, res) => {
  try {
    let events = await Event.find({ creator: req.user._id });
    
    // Populate and sort
    for (let event of events) {
      await event.populate('creator');
      await event.populate('attendees');
    }
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(events);
  } catch (error) {
    console.error('Get user created events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

