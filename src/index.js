require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const path = require('path');
const app = express();

//Models
const Task = require('./models/task');
const TaskList = require('./models/taskList');

// Routers
const taskRouter = require('./routers/task');
const taskListRouter = require('./routers/taskList');

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');

// Setup static directory to serve
app.use(express.static(publicDirPath));

// view engine configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates/views'));

// Middleware use
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routers
app.use(taskRouter);
app.use(taskListRouter);

app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});
    const tasklists = await TaskList.find({});

    var test = new Date(tasks[0].dueDate);
    console.log('task 0 duedate: ' + test.toISOString().substr(0, 10));

    res.render('todo.ejs', { tasks, tasklists });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(3000, () => console.log('Server Up and running'));
