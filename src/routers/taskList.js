const express = require('express');
const router = new express.Router();
const TaskList = require('../models/taskList');

// Get all task lists
router.get('/tasklist', async (req, res) => {
  const tasklist = await TaskList.find({});

  try {
    //   res.render('tasks', { tasks, title: 'Tasks' });
    res.send({ taskslist });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Submit task list
router.post('/tasklist', async (req, res) => {
  try {
    const tasklist = new TaskList(req.body);
    await tasklist.save();
    res.redirect('/');
  } catch (e) {
    res.status(400).send();
  }
});

// Remove task list
router.delete('/tasklist/:tid', async (req, res) => {
  try {
    const tasklist = await TaskList.findOneAndDelete({
      _id: req.params.tid,
    });
    if (!tasklist) return res.status(404).send();

    // TODO remove tasks of this list

    res.send(tasklist);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
