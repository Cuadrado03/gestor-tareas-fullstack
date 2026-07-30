const taskService = require('../services/task.service');

async function getAllTasks(req, res, next) {
  try {
    const tasks = taskService.getAllTasks();
    res.status(200).json({ success: true, data: tasks, count: tasks.length });
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = taskService.getTaskById(req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = taskService.deleteTask(req.params.id);
    res.status(200).json({ success: true, data: task, message: 'Tarea eliminada correctamente.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };