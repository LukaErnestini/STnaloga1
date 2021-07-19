const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
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

// Remove task
router.delete('/tasks/:tid', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.tid,
    });
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
