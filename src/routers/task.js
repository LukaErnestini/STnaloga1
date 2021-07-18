const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find({});

  try {
    //   res.render('tasks', { tasks, title: 'Tasks' });
    res.send({ tasks });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Submit task
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
