import { parseISO } from 'date-fns';
import { Task, taskMaster } from './tasks';
import { showAdd, hideModal } from './form-controller';
import { reloadList } from './display';

const createTask = () => {
  const taskId = taskMaster.read().length;
  const taskName = document.querySelector('#task-name-add').value;
  const taskDescription = document.querySelector('#task-description-add').value;
  const taskDate = document.querySelector('#task-date-add').value;
  const taskProject = Number(document.querySelector('#project-add').value);
  const taskPriority = document.querySelector(
    'input[name=priority-add]:checked'
  ).value;
  const date = !taskDate ? null : parseISO(taskDate);
  const newTask = new Task(
    taskId,
    taskName,
    taskDescription,
    date,
    taskProject,
    taskPriority
  );
  taskMaster.push(newTask);

  hideModal('add-task-menu');
  reloadList();
};

const editTask = () => {
  const editTaskForm = document.querySelector('#edit-task-form');
  const { taskId } = editTaskForm.dataset;
  const thisTask = taskMaster.findTask(taskId);
  const taskName = document.querySelector('#task-name-edit').value;
  const taskDescription = document.querySelector(
    '#task-description-edit'
  ).value;
  const taskDate = document.querySelector('#task-date-edit').value;
  const taskProject = Number(document.querySelector('#project-edit').value);
  const taskPriority = [
    ...document.querySelectorAll('input[name=priority-edit]'),
  ].find((priority) => priority.checked).value;

  thisTask.name = taskName;
  thisTask.description = taskDescription;
  thisTask.date = !taskDate ? null : parseISO(taskDate);
  thisTask.projectId = taskProject;
  thisTask.priority = taskPriority;

  hideModal('edit-task-menu');
  reloadList();
};

const initializeButtonEvents = () => {
  const submitAddTask = document.querySelector('#submit-add');
  const showAddTask = document.querySelector('#show-add-task');
  const submitEditTask = document.querySelector('#submit-edit');

  showAddTask.addEventListener('click', showAdd);
  submitAddTask.addEventListener('click', createTask);
  submitEditTask.addEventListener('click', editTask);
};

export { initializeButtonEvents as intializeTaskHandler, createTask, editTask };
