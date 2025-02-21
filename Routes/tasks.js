import express from "express"
import Task from "../models/Task.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// Create a new task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user._id,
    })
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "username")
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update a task
router.patch("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

