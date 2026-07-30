const { v4: uuidv4 } = require('uuid');
const { validateTaskInput } = require('../models/task.model');

let tasks = [];

function getAllTasks() {
  return [...tasks];
}

function getTaskById(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    const error = new Error(`No existe una tarea con id "${id}".`);
    error.statusCode = 404;
    throw error;
  }
  return task;
}

function createTask(data) {
  const { isValid, errors } = validateTaskInput(data, { partial: false });
  if (!isValid) {
    const error = new Error('Datos inválidos');
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  const now = new Date().toISOString();
  const newTask = {
    id: uuidv4(),
    title: data.title.trim(),
    description: data.description ? data.description.trim() : '',
    status: data.status,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  return newTask;
}

function updateTask(id, data) {
  const task = getTaskById(id);

  const { isValid, errors } = validateTaskInput(data, { partial: true });
  if (!isValid) {
    const error = new Error('Datos inválidos');
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  if (data.title !== undefined) task.title = data.title.trim();
  if (data.description !== undefined) task.description = data.description.trim();
  if (data.status !== undefined) task.status = data.status;
  task.updatedAt = new Date().toISOString();

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const error = new Error(`No existe una tarea con id "${id}".`);
    error.statusCode = 404;
    throw error;
  }
  const [deleted] = tasks.splice(index, 1);
  return deleted;
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };