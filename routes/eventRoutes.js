// const express = require('express');
// const { createEvent, getEvents, getEventById } = require('../controllers/eventController');
// const { protect } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', protect, createEvent);
// router.get('/', protect, getEvents);
// router.get('/:id', protect, getEventById);

// module.exports = router;


const express = require('express');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', protect, getEvents);
router.get('/:id', protect, getEventById);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
