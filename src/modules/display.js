import {
  format,
  isWithinInterval,
  isToday,
  addDays,
  startOfToday,
} from 'date-fns';
import { taskMaster } from './tasks';
import { projectMaster } from './projects';
import {
  initializeFormController,
  showEdit,
  showRename,
  updateSelectOptions,
  updateSelectValues,
  squashEdit
} from './form-controller';

const generateTaskEvents = (elements, taskId) => {
  for (let i = 0; i < elements.length; i++) {
    if (i === 0) {
      // left
      const checkCircle = document.createElement('button');
      checkCircle.setAttribute('type', 'button');
      checkCircle.classList.add('item-check');
      checkCircle.dataset.taskId = taskId;
      checkCircle.addEventListener('click', () =>
        completeTask(checkCircle.dataset.taskId)
      );
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
        if (j === 0) {
          button.addEventListener('click', () =>
            showEdit(button.dataset.taskId)
          );
        } else {
          button.addEventListener('click', () =>
            removeTask(button.dataset.taskId)
          );
        }
        itemButtons.appendChild(button);
      }
      elements[i].append(itemButtons);
    }
  }

  return elements;
};

const createTaskItem = (task) => {
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
      header.textContent = task.date ? format(task.date, 'd MMM yyyy') : '';
      para.textContent =
        task.projectId === 3
          ? ''
          : projectMaster.findProject(task.projectId).name;
    }
    details.append(header, para);
    elements[i].append(details);
  }

  elements = generateTaskEvents(elements, taskId);
  taskItem.append(...elements);

  return taskItem;
};

const clearTaskList = () => {
  const pendingTaskList = document.querySelector('#pending-task-list');
  const completedTaskList = document.querySelector('#completed-task-list');
  while (pendingTaskList.childElementCount > 0) {
    pendingTaskList.removeChild(pendingTaskList.firstElementChild);
  }
  while (completedTaskList.childElementCount > 0) {
    completedTaskList.removeChild(completedTaskList.firstElementChild);
  }
};

const renderTaskList = (listName, listId, taskList) => {
  const listTitle = document.querySelector('#list-title');
  const mainDisplay = document.querySelector('#main-display');
  const pendingTaskList = document.querySelector('#pending-task-list');
  const completedTaskList = document.querySelector('#completed-task-list');

  listTitle.textContent = listName;
  mainDisplay.dataset.listId = listId;

  clearTaskList();
  taskList.forEach((task) => {
    const listItem = createTaskItem(task);
    if (task.completed) {
      completedTaskList.insertBefore(
        listItem,
        completedTaskList.firstElementChild
      );
    } else {
      pendingTaskList.insertBefore(listItem, pendingTaskList.firstElementChild);
    }
  });
  updateSelectValues();
};

const openList = (id) => {
  const idNum = Number(id);
  let taskList = taskMaster.read();
  let listName;
  if (idNum < 3) {
    switch (idNum) {
      case 0:
        listName = 'All';
        break;
      case 1:
        taskList = taskList.filter((task) => isToday(task.date));
        listName = 'Today';
        break;
      case 2:
        taskList = taskList.filter((task) => isWithinWeek(task));
        listName = 'Next 7 Days';
        break;
      // No default
    }
  } else {
    const project = projectMaster.findProject(id);
    listName = project.name;
    taskList = project.taskList();
  }
  renderTaskList(listName, id, taskList);
};

const reloadList = (
  id = document.querySelector('#main-display').dataset.listId
) => {
  openList(id);
};

const generateProjectEvents = (projectItem) => {
  const { projectId } = projectItem.dataset;
  const projectLeft = projectItem.querySelector('.project-left');
  projectLeft.addEventListener('click', () => openList(projectId));

  const projectRemove = projectItem.querySelector('.project-remove');
  projectRemove.addEventListener('click', () => removeProject(projectItem));

  const projectEdit = projectItem.querySelector('.project-edit');
  projectEdit.addEventListener('click', () => showRename(projectId, projectItem))

  return projectItem;
};

const createProjectItem = (project) => {
  const projectId = project.id;
  const displayWrapper = document.createElement('div');
  displayWrapper.classList.add('display-wrapper');
  let projectItem = document.createElement('div');
  projectItem.classList.add('project-item');
  projectItem.dataset.projectId = projectId;

  const projectLeft = document.createElement('div');
  projectLeft.classList.add('project-left');
  const navIcon = document.createElement('div');
  navIcon.classList.add('nav-icon');
  const projectName = document.createElement('span');
  projectName.textContent = project.name;
  projectLeft.append(navIcon, projectName);

  const projectButtons = document.createElement('div');
  projectButtons.classList.add('project-buttons');
  const buttons = ['project-edit', 'project-remove'];
  for (let i = 0; i < buttons.length; i++) {
    const button = document.createElement('button');
    button.classList.add(buttons[i]);
    button.dataset.projectId = projectId;
    projectButtons.appendChild(button);
  }

  projectItem.append(projectLeft, projectButtons);
  projectItem = generateProjectEvents(projectItem);
  displayWrapper.appendChild(projectItem);

  return displayWrapper;
};

const clearProjectList = () => {
  const projectList = document.querySelector('#project-list');
  while (projectList.childElementCount > 1) {
    projectList.removeChild(projectList.lastElementChild);
  }
};

const renderProjectList = () => {
  const listDiv = document.querySelector('#project-list');
  // Filters out inbox project (id=3), projects start at id=4
  const projectList = projectMaster.read().filter((project) => project.id > 3);
  clearProjectList();
  projectList.forEach((project) => {
    const projectItem = createProjectItem(project);
    listDiv.appendChild(projectItem);
  });
  updateSelectOptions();
  updateSelectValues();
};

function removeTask(id) {
  squashEdit(id)
  taskMaster.remove(id);
  reloadList();
}

function completeTask(id) {
  const thisTask = taskMaster.findTask(id);
  thisTask.completed = !thisTask.completed;
  reloadList();
}

function removeProject(projectItem) {
  const projectId = Number(projectItem.dataset.projectId);
  let listId = Number(document.querySelector('#main-display').dataset.listId);
  // Also removes tasks that belong to project to be removed
  const existingTasks = projectMaster.findProject(projectId).taskList();
  existingTasks.forEach((task) => {
    squashEdit(task.id)
    taskMaster.remove(task.id);
  });
  projectMaster.remove(projectId);
  projectItem.parentElement.remove();

  if (listId > projectId) {
    listId -= 1;
    openList(listId);
  } else if (listId === projectId) {
    // Opens inbox
    openList(3);
  } else {
    reloadList();
  }

  renderProjectList();
}

function isWithinWeek(task) {
  return isWithinInterval(task.date, {
    start: startOfToday(),
    end: addDays(startOfToday(), 8),
  });
}

const initializeNavHomeEvents = () => {
  const homeLinks = document.querySelectorAll('.home-item');
  homeLinks.forEach((link) => {
    link.addEventListener('click', () => openList(link.dataset.sortId));
  });
};

const initializeUI = () => {
  initializeFormController();
  initializeNavHomeEvents();
};

export { initializeUI, reloadList, renderProjectList };
