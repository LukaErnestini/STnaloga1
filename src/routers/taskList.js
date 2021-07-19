const express = require('express');
const router = new express.Router();
const TaskList = require('../models/taskList');

// Get all tasks
router.get('/tasklist', async (req, res) => {
  const tasklist = await TaskList.find({});

  try {
    //   res.render('tasks', { tasks, title: 'Tasks' });
    res.send({ taskslist });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Submit task
router.post('/tasklist', async (req, res) => {
  try {
    const tasklist = new TaskList(req.body);
    await tasklist.save();
    res.redirect('/');
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
