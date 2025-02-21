import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "../models/User.js"
import Task from "../models/Task.js"

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Task.deleteMany({})

    // Create users
    const admin = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: "adminpassword",
      role: "Admin",
    })

    const manager = await User.create({
      username: "manager",
      email: "manager@example.com",
      password: "managerpassword",
      role: "Manager",
    })

    const employee = await User.create({
      username: "employee",
      email: "employee@example.com",
      password: "employeepassword",
      role: "Employee",
    })

    // Create tasks
    await Task.create({
      title: "Implement User Authentication",
      description: "Set up user registration and login functionality",
      status: "In Progress",
      priority: "High",
      assignedTo: employee._id,
      createdBy: manager._id,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    })

    await Task.create({
      title: "Design Dashboard UI",
      description: "Create a responsive dashboard design for the task management system",
      status: "To Do",
      priority: "Medium",
      assignedTo: employee._id,
      createdBy: manager._id,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    })

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    mongoose.disconnect()
  }
}

seedDatabase()

