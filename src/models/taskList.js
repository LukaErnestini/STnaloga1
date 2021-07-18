const mongoose = require('mongoose');

const taskListSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    tasks: [
      {
        taskId: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true }
);

const TaskList = mongoose.model('TaskList', taskListSchema);
module.exports = TaskList;
