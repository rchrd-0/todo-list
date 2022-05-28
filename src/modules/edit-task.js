import { parseISO } from 'date-fns';
import { taskMaster } from './tasks';

const editTask = () => {
  const editTaskForm = document.querySelector('#edit-task-form');
  const { taskId } = editTaskForm.dataset;
  const thisTask = taskMaster.findTask(taskId);
  const taskName = document.querySelector('#task-name-edit').value;
  const taskDescription = document.querySelector(
    '#task-description-edit'
  ).value;
  const taskDate = document.querySelector('#task-date-edit').value;

  thisTask.name = taskName;
  thisTask.description = taskDescription;
  thisTask.date = !taskDate ? null : parseISO(taskDate);
};

export { editTask };
