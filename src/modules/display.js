import { taskFactory, taskMaster } from './tasks';

function generateButtons(elements) {
  for (let i = 0; i < elements.length; i++) {
    if (i === 0) {
      // left
      const checkCircle = document.createElement('button');
      checkCircle.setAttribute('type', 'button');
      checkCircle.classList.add('item-check');
      elements[i].insertBefore(checkCircle, elements[i].firstElementChild);
    } else {
      // right
      const rightSideBtns = ['item-edit', 'item-remove'];
      const itemButtons = document.createElement('div');
      itemButtons.classList.add('item-buttons');
      for (let j = 0; j < rightSideBtns.length; j++) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        itemButtons.appendChild(button);
      }
      elements[i].append(itemButtons);
    }
  }

  return elements;
}

const createListItem = (task) => {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.dataset.taskId = task.id;

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
      header.textContent = 'Date';
      para.textContent = 'Project';
    }
    details.append(header, para);
    elements[i].append(details);
  }

  elements = generateButtons(elements);
  taskItem.append(...elements);

  return taskItem;
};

function createTask() {
  const pendingTaskList = document.querySelector('#pending-task-list');
  const taskId = taskMaster.read().length;
  const taskName = document.querySelector('#task-name-add').value;
  const taskDescription = document.querySelector('#task-description-add').value;

  const newTask = taskFactory(taskId, taskName, taskDescription);
  taskMaster.push(newTask);

  const newItem = createListItem(newTask);
  pendingTaskList.insertBefore(newItem, pendingTaskList.firstElementChild);
};

const addMenuEvents = () => {
  const submitAddTask = document.querySelector('#submit-add');
  submitAddTask.addEventListener('click', createTask);
};

const initializeDisplay = () => {
  addMenuEvents();
};

export { initializeDisplay };
