import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const createdBy = req.user.id;

    const existingTask = await Task.findOne({ title, createdBy });
    if (existingTask) {
      return res
        .status(400)
        .json({ message: "You have already created a task with this title!" });
    }

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy,
    });

    // Save the task to the database
    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { title } = req.body;

    // Find user specific task
    const task = await Task.findOne({ title });
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({ message: "Task found", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const createdBy = req.user.id;

    // get all user created task
    const task = await Task.find({ createdBy });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task found", task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const title = req.params.id;
    const update = req.body;
    const updateTask = await Task.findByIdAndUpdate(title, update, {
      new: true,
    });

    res.status(201).json({ message: "Task Updated Successfully", updateTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const title = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(title);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({ message: "Task Deleted Successfully", deletedTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
