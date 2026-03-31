const Task = require("../models/Task");
const User = require("../models/user");

// Helper function to resolve and validate assignedUserId
const resolveAssignedUserId = async (assignedUserId) => {
    if (!assignedUserId) {
        return null;
    }

    const user = await User.findById(assignedUserId);
    if (!user) {
        throw new Error("Invalid assignedUserId: User not found");
    }

    return assignedUserId;
};

// Create a new task
const createTask = async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Unauthorized: User not logged in"
            });
        }

        // Get data from request
        const { title, description, done, priority, assignedUserId } = req.body;

        // Validate: title is required
        if (!title) {
            return res.status(400).json({
                message: "Title is required!"
            });
        }

        // Validate assignedUserId if provided
        let resolvedAssignedUserId = null;
        if (assignedUserId) {
            try {
                resolvedAssignedUserId = await resolveAssignedUserId(assignedUserId);
            } catch (error) {
                return res.status(400).json({
                    message: error.message
                });
            }
        }

        // Create task
        const task = await Task.create({
            title,
            description,
            done: done || false,
            priority: priority || 'medium',
            assignedUserId: resolvedAssignedUserId,
            userId: req.user.id
        });

        return res.status(201).json({
            message: "Task created successfully.",
            data: {
                task: {
                    id: task._id,
                    title: task.title,
                    description: task.description,
                    done: task.done,
                    priority: task.priority,
                    assignedUserId: task.assignedUserId,
                    userId: task.userId,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while creating task."
        });
    }
};

// Get tasks for logged-in user
const getTasks = async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Unauthorized: User not logged in"
            });
        }

        // Find tasks where userId === req.user.id OR assignedUserId === req.user.id
        const tasks = await Task.find({
            $or: [
                { userId: req.user.id },
                { assignedUserId: req.user.id }
            ]
        })
            .sort({ createdAt: -1 })
            .populate("userId", "name email")
            .populate("assignedUserId", "name email");

        return res.status(200).json({
            message: "Tasks retrieved successfully.",
            data: {
                tasks
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while fetching tasks."
        });
    }
};

module.exports = { createTask, getTasks };
