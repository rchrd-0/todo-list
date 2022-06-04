import {
  format,
  isWithinInterval,
  isToday,
  addDays,
  startOfToday,
} from 'date-fns';
import _ from 'lodash';
import { taskMaster, storeTaskList, initializeTasks } from './tasks';
import {
  projectMaster,
  storeProjectList,
  initializeProjects,
} from './projects';
import {
  initializeFormController,
  showEdit,
  showRename,
  updateSelectOptions,
  updateSelectValues,
  squashEdit,
  hideMenu,
} from './form-controller';

const generateTaskEvents = (elements, task) => {
  for (let i = 0; i < elements.length; i++) {
    if (i === 0) {
      // left
      const checkCircle = document.createElement('button');
      checkCircle.setAttribute('type', 'button');
      checkCircle.classList.add('item-check');
      checkCircle.dataset.taskId = task.id;
      checkCircle.dataset.priority = task.priority;
      checkCircle.dataset.completed = task.completed;
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
        button.dataset.taskId = task.id;
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

  elements = generateTaskEvents(elements, task);
  taskItem.append(...elements);

  return taskItem;
};

const setActive = (id) => {
  const idNum = Number(id);
  const homeItems = document.querySelectorAll('.home-item');
  const projectItems = document.querySelectorAll('.project-item');

  if (id < 4) {
    [...projectItems].forEach((pI) =>
      pI.parentElement.classList.remove('set-active')
    );
    [...homeItems].forEach((i) => {
      if (Number(i.dataset.sortId) === idNum) {
        i.classList.add('set-active');
      } else {
        i.classList.remove('set-active');
      }
    });
  } else {
    [...homeItems].forEach((i) => i.classList.remove('set-active'));
    [...projectItems].forEach((pI) => {
      if (Number(pI.dataset.projectId) === idNum) {
        pI.parentElement.classList.add('set-active');
      } else {
        pI.parentElement.classList.remove('set-active');
      }
    });
  }
};

const generateEmptySplash = () => {
  const pendingTaskList = document.querySelector('#pending-task-list');
  const emptySplash = document.createElement('div');
  const text = [
    'All good!',
    'All done!',
    'What\'s the plan?',
    'Let\'s get started!',
    'Whew, no tasks!',
    'Good to go!',
  ];
  const illus = ['illus-0', 'illus-1', 'illus-2', 'illus-3', 'illus-4'];
  emptySplash.classList.add('empty-splash');
  emptySplash.setAttribute(
    'id',
    illus[Math.floor(Math.random() * illus.length)]
  );
  emptySplash.textContent = text[Math.floor(Math.random() * text.length)];
  pendingTaskList.append(emptySplash);
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

  if (taskList.filter((task) => !task.completed).length < 1) {
    generateEmptySplash();
  }
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
  storeTaskList();
  storeProjectList();
};

const findList = (listId) => {
  const idNum = Number(listId);
  let taskList = taskMaster.read();
  if (idNum < 3) {
    switch (idNum) {
      case 1:
        taskList = taskList.filter((task) => isToday(task.date));
        break;
      case 2:
        taskList = taskList.filter((task) => isWithinWeek(task));
        break;
      // No default
    }
  } else {
    taskList = projectMaster.findProject(idNum).taskList();
  }
  return taskList;
};

const openList = (id) => {
  const idNum = Number(id);
  const taskList = findList(id);
  let listName;
  if (idNum < 3) {
    switch (idNum) {
      case 0:
        listName = 'All';
        break;
      case 1:
        listName = 'Today';
        break;
      case 2:
        listName = 'Next 7 Days';
        break;
      // No default
    }
  } else {
    listName = projectMaster.findProject(id).name;
  }
  setActive(id);
  renderTaskList(listName, id, taskList);
};

const reloadList = (
  id = document.querySelector('#main-display').dataset.listId
) => {
  openList(id);
};

const generateProjectEvents = (project, projectItem) => {
  const projectLeft = projectItem.querySelector('.project-left');
  projectLeft.addEventListener('click', () => openList(project.id));

  const projectRemove = projectItem.querySelector('.project-remove');
  projectRemove.addEventListener('click', () => removeProject(projectItem));

  const projectEdit = projectItem.querySelector('.project-edit');
  projectEdit.addEventListener('click', () =>
    showRename(project.id, projectItem)
  );

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
  navIcon.classList.add('nav-icon', 'project-icon');
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
  projectItem = generateProjectEvents(project, projectItem);
  displayWrapper.appendChild(projectItem);

  return displayWrapper;
};

const addProjectToList = (project) => {
  const projectList = document.querySelector('#project-list');
  const projectItem = createProjectItem(project);
  projectList.appendChild(projectItem);
  updateSelectOptions();
  updateSelectValues();
  storeTaskList();
  storeProjectList();
};

const updateProjectList = (id) => {
  const renameProjectForm = document.querySelector('#rename-project-form');
  const { renameId } = renameProjectForm.dataset;
  if (renameId !== 'null' && Number(renameId) > id) {
    renameProjectForm.dataset.renameId -= 1;
  }
  const projectElements = document.querySelectorAll('[data-project-id]');
  [...projectElements].forEach((element) => {
    if (Number(element.dataset.projectId) > id) {
      element.dataset.projectId -= 1;
    }
  });
  updateSelectOptions();
  updateSelectValues();
  storeTaskList();
  storeProjectList();
};

function removeProject(projectItem) {
  const projectId = Number(projectItem.dataset.projectId);
  let listId = Number(document.querySelector('#main-display').dataset.listId);
  // Also removes tasks that belong to project to be removed
  const existingTasks = projectMaster.findProject(projectId).taskList();
  existingTasks.forEach((task) => taskMaster.remove(task.id));
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
  updateProjectList(projectId);
  hideMenu('edit-task-menu');
}

function removeTask(id) {
  squashEdit(id);
  taskMaster.remove(id);
  reloadList();
}

function clearCompletedTasks() {
  const currentList = document.querySelector('#main-display').dataset.listId;
  const taskList = findList(currentList);
  const completedTasks = taskList.filter((task) => task.completed === true);
  completedTasks.forEach((task) => removeTask(task.id));
}

function completeTask(id) {
  const thisTask = taskMaster.findTask(id);
  thisTask.toggleStatus();
  reloadList();
}

function isWithinWeek(task) {
  return isWithinInterval(task.date, {
    start: startOfToday(),
    end: addDays(startOfToday(), 8),
  });
}

function initializeButtonEvents() {
  const homeLinks = document.querySelectorAll('.home-item');
  homeLinks.forEach((link) => {
    link.addEventListener('click', () => openList(link.dataset.sortId));
  });
  const removeCompleted = document.querySelector('#remove-completed');
  removeCompleted.addEventListener('click', clearCompletedTasks);
}

function retrieveStorage() {
  initializeTasks();
  initializeProjects();
  const storedProjectList = _.drop(projectMaster.read(), 1);
  storedProjectList.forEach((project) => addProjectToList(project));
}

function initializeUI() {
  retrieveStorage();
  initializeFormController();
  initializeButtonEvents();
  window.addEventListener('load', () => openList(3));
}

export { initializeUI, reloadList, addProjectToList };
