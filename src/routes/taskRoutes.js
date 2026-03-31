const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all task routes
router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);

module.exports = router;
