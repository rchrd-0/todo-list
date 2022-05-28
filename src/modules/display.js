import { taskFactory, taskMaster } from './tasks';

const createTask = () => {
  const addTaskForm = document.querySelector('#add-task-form');
  const taskName = document.querySelector('#task-name-add').value
  const taskDesc = document.querySelector('#task-description-add').value;
  const taskId = taskMaster.read().length;
  taskMaster.push(taskFactory(taskId, taskName, taskDesc));
}

const addMenuEvents = () => {
  const submitAddTask = document.querySelector('#submit-add');
  submitAddTask.addEventListener('click', createTask)
}

const initializeDisplay = () => {
  addMenuEvents();
}

export { initializeDisplay };
