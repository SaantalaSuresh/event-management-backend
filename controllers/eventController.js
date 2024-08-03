// const Event = require('../models/Event');

// exports.createEvent = async (req, res) => {
//   const { name, date, location, description } = req.body;

//   try {
//     const event = new Event({ name, date, location, description, createdBy: req.user._id });
//     await event.save();

//     res.status(201).json(event);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.getEvents = async (req, res) => {
//   try {
//     const events = await Event.find({ createdBy: req.user._id });
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     if (event) {
//       res.json(event);
//     } else {
//       res.status(404).json({ message: 'Event not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, date, location, description } = req.body;

  try {
    const event = new Event({ name, date, location, description, createdBy: req.user._id });
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { name, date, location, description } = req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'You are not authorized to edit this event' });
    }

    event.name = name || event.name;
    event.date = date || event.date;
    event.location = location || event.location;
    event.description = description || event.description;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// exports.deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     if (event.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: 'You are not authorized to delete this event' });
//     }

//     await event.remove();
//     res.json({ message: 'Event removed' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      console.log('Event not found');
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      console.log('User not authorized to delete this event');
      return res.status(401).json({ message: 'You are not authorized to delete this event' });
    }

    await event.deleteOne(); // Use deleteOne() method to delete the event
    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error('Error deleting event:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
