import { parseISO, format } from 'date-fns';
import { taskFactory, taskMaster } from './tasks';
import { showAdd, hideMenu } from './form-controller';

const generateButtons = (elements, taskId) => {
  for (let i = 0; i < elements.length; i++) {
    if (i === 0) {
      // left
      const checkCircle = document.createElement('button');
      checkCircle.setAttribute('type', 'button');
      checkCircle.classList.add('item-check');
      checkCircle.dataset.taskId = taskId;
      elements[i].insertBefore(checkCircle, elements[i].firstElementChild);
    } else {
      // right
      const rightSideBtns = ['item-edit', 'item-remove'];
      const itemButtons = document.createElement('div');
      itemButtons.classList.add('item-buttons');
      for (let j = 0; j < rightSideBtns.length; j++) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add(rightSideBtns[j]);
        button.dataset.taskId = taskId;
        itemButtons.appendChild(button);
      }
      elements[i].append(itemButtons);
    }
  }

  return elements;
};

const createListItem = (task) => {
  const taskId = task.id;
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.dataset.taskId = taskId;

  const sections = ['left', 'right'];
  let elements = [];
  sections.forEach((section) => {
    const div = document.createElement('div');
    div.classList.add(section);
    elements.push(div);
  });

  for (let i = 0; i < elements.length; i++) {
    const details = document.createElement('div');
    details.classList.add('details');
    const header = document.createElement('h2');
    const para = document.createElement('p');

    if (i === 0) {
      header.textContent = task.name;
      para.textContent = task.description;
    } else {
      header.textContent = (task.date) ? format(task.date, 'd MMM yyyy') : '';
      para.textContent = 'Project';
    }
    details.append(header, para);
    elements[i].append(details);
  }

  elements = generateButtons(elements, taskId);
  taskItem.append(...elements);

  return taskItem;
};

const createTask = () => {
  const pendingTaskList = document.querySelector('#pending-task-list');
  const taskId = taskMaster.read().length;
  const taskName = document.querySelector('#task-name-add').value;
  const taskDescription = document.querySelector('#task-description-add').value;
  const taskDate = document.querySelector('#task-date-add').value;

  const date = !taskDate ? null : parseISO(taskDate);
  const newTask = taskFactory(taskId, taskName, taskDescription, date);
  taskMaster.push(newTask);

  const newItem = createListItem(newTask);
  pendingTaskList.insertBefore(newItem, pendingTaskList.firstElementChild);
};

const validateNameInput = (form) => {
  const nameField = form.querySelector('input[name="name"]');
  const submit = form.querySelector('.submit');
  if (nameField.validity.valid) {
    submit.removeAttribute('disabled');
  } else {
    submit.setAttribute('disabled', ' ');
  }
};

const initializeForms = () => {
  const addTaskForm = document.querySelector('#add-task-form');
  addTaskForm.addEventListener('input', () => validateNameInput(addTaskForm));
};

const initializeButtonEvents = () => {
  const submitAddTask = document.querySelector('#submit-add');
  const showAddTask = document.querySelector('#show-add-task');
  const cancelBtns = document.querySelectorAll('.cancel');

  showAddTask.addEventListener('click', showAdd);
  submitAddTask.addEventListener('click', createTask);
  cancelBtns.forEach(button => button.addEventListener('click', ((e) => {
    hideMenu(e.target.dataset.menu);
  })))
};

const initializeUI = () => {
  initializeButtonEvents();
  initializeForms();
};

export { initializeUI };
