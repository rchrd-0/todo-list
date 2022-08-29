"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["display"],{

/***/ "./src/modules/display.js":
/*!********************************!*\
  !*** ./src/modules/display.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProjectToList": () => (/* binding */ addProjectToList),
/* harmony export */   "initializeUI": () => (/* binding */ initializeUI),
/* harmony export */   "reloadList": () => (/* binding */ reloadList)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isToday/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isWithinInterval/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfToday/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addDays/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/modules/tasks.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");
/* harmony import */ var _form_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form-controller */ "./src/modules/form-controller.js");






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
            (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.showEdit)(button.dataset.taskId)
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
      header.textContent = task.date ? (0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(task.date, 'd MMM yyyy') : '';
      para.textContent =
        task.projectId === 3
          ? ''
          : _projects__WEBPACK_IMPORTED_MODULE_2__.projectMaster.findProject(task.projectId).name;
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
    "What's the plan?",
    "Let's get started!",
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
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.updateSelectValues)();
  (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.storeTaskList)();
  (0,_projects__WEBPACK_IMPORTED_MODULE_2__.storeProjectList)();
};

const findList = (listId) => {
  const idNum = Number(listId);
  let taskList = _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMaster.read();
  if (idNum < 3) {
    switch (idNum) {
      case 1:
        taskList = taskList.filter((task) => (0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])(task.date));
        break;
      case 2:
        taskList = taskList.filter((task) => isWithinWeek(task));
        break;
      // No default
    }
  } else {
    taskList = _projects__WEBPACK_IMPORTED_MODULE_2__.projectMaster.findProject(idNum).taskList();
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
    listName = _projects__WEBPACK_IMPORTED_MODULE_2__.projectMaster.findProject(id).name;
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
    (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.showRename)(project.id, projectItem)
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
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.updateSelectOptions)();
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.updateSelectValues)();
  (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.storeTaskList)();
  (0,_projects__WEBPACK_IMPORTED_MODULE_2__.storeProjectList)();
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
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.updateSelectOptions)();
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.updateSelectValues)();
  (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.storeTaskList)();
  (0,_projects__WEBPACK_IMPORTED_MODULE_2__.storeProjectList)();
};

function removeProject(projectItem) {
  const projectId = Number(projectItem.dataset.projectId);
  let listId = Number(document.querySelector('#main-display').dataset.listId);
  // Also removes tasks that belong to project to be removed
  const existingTasks = _projects__WEBPACK_IMPORTED_MODULE_2__.projectMaster.findProject(projectId).taskList();
  existingTasks.forEach((task) => _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMaster.remove(task.id));
  _projects__WEBPACK_IMPORTED_MODULE_2__.projectMaster.remove(projectId);
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
  // hideMenu('edit-task-menu');
}

function removeTask(id) {
  _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMaster.remove(id);
  reloadList();
}

function clearCompletedTasks() {
  const currentList = document.querySelector('#main-display').dataset.listId;
  const taskList = findList(currentList);
  const completedTasks = taskList.filter((task) => task.completed === true);
  completedTasks.forEach((task) => removeTask(task.id));
}

function completeTask(id) {
  const thisTask = _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMaster.findTask(id);
  thisTask.toggleStatus();
  reloadList();
}

function isWithinWeek(task) {
  return (0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(task.date, {
    start: (0,date_fns__WEBPACK_IMPORTED_MODULE_7__["default"])(),
    end: (0,date_fns__WEBPACK_IMPORTED_MODULE_8__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_7__["default"])(), 8),
  });
}

function initializeEvents() {
  const homeLinks = document.querySelectorAll('.home-item');
  homeLinks.forEach((link) => {
    link.addEventListener('click', () => openList(link.dataset.sortId));
  });

  const removeCompleted = document.querySelector('#remove-completed');
  removeCompleted.addEventListener('click', clearCompletedTasks);

  const backdrop = document.querySelector('#backdrop');
  backdrop.addEventListener('click', () => {
    const activeModal = document.querySelector('[data-active-modal="true"]');
    (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.hideModal)(activeModal.id);
  });

  const hamburger = document.querySelector('#hamburger');
  const ham = document.querySelectorAll('#hamburger > div');
  const [...navDisplay] = document.querySelectorAll('#main-display, nav');
  hamburger.addEventListener('click', () => {
    ham.forEach((div) => div.classList.toggle('open'));
    navDisplay.forEach((div) => div.classList.toggle('slide-open'));
  });
}

function retrieveStorage() {
  (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.initializeTasks)();
  (0,_projects__WEBPACK_IMPORTED_MODULE_2__.initializeProjects)();
  const storedProjectList = lodash__WEBPACK_IMPORTED_MODULE_0___default().drop(_projects__WEBPACK_IMPORTED_MODULE_2__.projectMaster.read(), 1);
  storedProjectList.forEach((project) => addProjectToList(project));
}

// function backdropHideSelf() {}

function initializeUI() {
  retrieveStorage();
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.initializeFormController)();
  initializeEvents();
  window.addEventListener('load', () => openList(3));
}




/***/ }),

/***/ "./src/modules/form-controller.js":
/*!****************************************!*\
  !*** ./src/modules/form-controller.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hideMenu": () => (/* binding */ hideMenu),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "initializeFormController": () => (/* binding */ initializeFormController),
/* harmony export */   "showAdd": () => (/* binding */ showAdd),
/* harmony export */   "showAddProject": () => (/* binding */ showAddProject),
/* harmony export */   "showEdit": () => (/* binding */ showEdit),
/* harmony export */   "showRename": () => (/* binding */ showRename),
/* harmony export */   "updateSelectOptions": () => (/* binding */ updateSelectOptions),
/* harmony export */   "updateSelectValues": () => (/* binding */ updateSelectValues)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfToday/index.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/modules/tasks.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");




// const insertTop = (menu) => {
//   const menusSection = document.querySelector('#menus');
//   menusSection.insertBefore(menu, menusSection.firstElementChild);
// };

const toggleBackdrop = () => {
  const backdrop = document.querySelector('#backdrop');
  backdrop.classList.toggle('visible');
};

const updateSelectOptions = () => {
  // const menus = document.querySelector('#menus');
  const menus = document.querySelector('#main-display');
  const forms = menus.querySelectorAll('form');
  forms.forEach((form) => {
    const projectSelect = form.querySelector('select');
    while (projectSelect.childElementCount > 0) {
      projectSelect.removeChild(projectSelect.firstElementChild);
    }

    const projectList = _projects__WEBPACK_IMPORTED_MODULE_1__.projectMaster.read();
    projectList.forEach((project) => {
      const option = document.createElement('option');
      option.textContent = project.name;
      option.value = project.id;
      projectSelect.appendChild(option);
    });
  });
};

const updateSelectValues = () => {
  const listId = Number(document.querySelector('#main-display').dataset.listId);
  const addTaskForm = document.querySelector('#add-task-form');
  const projectSelectAdd = addTaskForm.querySelector('select');
  projectSelectAdd.value = listId > 3 ? listId : 3;
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

const showAdd = () => {
  const currentList = document.querySelector('#main-display').dataset.listId;
  const addTaskMenu = document.querySelector('#add-task-menu');
  const addTaskForm = addTaskMenu.querySelector('form');
  const dateInput = addTaskForm.querySelector('input[type="date"]');
  addTaskForm.reset();
  addTaskMenu.classList.toggle('visible');
  addTaskMenu.dataset.activeModal = true;

  if (Number(currentList) === 1) {
    dateInput.value = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(), 'yyyy-MM-dd');
  }

  toggleBackdrop();
  updateSelectValues();
  validateNameInput(addTaskForm);
};

const getTaskInfo = (id) => {
  const editTaskForm = document.querySelector('#edit-task-form');
  const editName = editTaskForm.querySelector('#task-name-edit');
  const editDescription = editTaskForm.querySelector('#task-description-edit');
  const editDate = editTaskForm.querySelector('#task-date-edit');
  const editProject = editTaskForm.querySelector('#project-edit');
  const editPriority = editTaskForm.querySelectorAll(
    'input[name=priority-edit]'
  );

  const thisTask = _tasks__WEBPACK_IMPORTED_MODULE_0__.taskMaster.findTask(id);
  editName.value = thisTask.name;
  editDescription.value = thisTask.description;
  editDate.value = !thisTask.date ? '' : (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(thisTask.date, 'yyyy-MM-dd');
  editProject.value = thisTask.projectId;
  editPriority.forEach((input) => {
    if (input.value === thisTask.priority) {
      input.setAttribute('checked', '');
    } else {
      input.removeAttribute('checked');
    }
  });
};

const showEdit = (id) => {
  const showEditMenu = document.querySelector('#edit-task-menu');
  const editTaskForm = showEditMenu.querySelector('form');

  showEditMenu.classList.toggle('visible');
  showEditMenu.dataset.activeModal = true;

  editTaskForm.dataset.taskId = id;
  toggleBackdrop();
  getTaskInfo(id);
  validateNameInput(editTaskForm);
};

const showAddProject = () => {
  const showAddProjectMenu = document.querySelector('#add-project-menu');
  const addProjectForm = showAddProjectMenu.querySelector('form');
  showAddProjectMenu.classList.remove('display-none');
  validateNameInput(addProjectForm);
};

const showRename = (id, projectItem) => {
  const renameProjectMenu = document.querySelector('#rename-project-menu');
  const renameProjectForm = document.querySelector('#rename-project-form');
  const nameInput = renameProjectForm.querySelector('input[name="name"]');
  const projectList = document.querySelector('#project-list');
  const thisItem = projectItem.parentElement;

  if (renameProjectForm.dataset.projectId !== 'null') {
    hideMenu('rename-project-menu');
  }

  renameProjectForm.dataset.renameId = id;
  nameInput.value = _projects__WEBPACK_IMPORTED_MODULE_1__.projectMaster.findProject(id).name;
  projectList.insertBefore(renameProjectMenu, thisItem);
  thisItem.classList.add('display-none');
  renameProjectMenu.classList.remove('display-none');
  validateNameInput(renameProjectForm);
};

const hideRename = (menu) => {
  const projectList = document.querySelector('#project-list');
  const renameMenu = menu;
  const renameForm = menu.firstElementChild;
  renameForm.dataset.renameId = null;
  renameMenu.nextElementSibling.classList.remove('display-none');
  projectList.insertBefore(renameMenu, projectList.firstElementChild);
};

// const squashEdit = (id) => {
//   const editTaskForm = document.querySelector('#edit-task-form');

//   if (![id, editTaskForm.dataset.taskId].includes('null')) {
//     const idNum = Number(id);
//     const elementId = Number(editTaskForm.dataset.taskId);

//     if (idNum === elementId) {
//       hideMenu(editTaskForm.parentElement.getAttribute('id'));
//     }
//   }
// };

const setMinDate = () => {
  const dateInputs = document.querySelectorAll('input[type=date]');
  const today = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(new Date(), 'yyyy-MM-dd');
  dateInputs.forEach((input) => input.setAttribute('min', today));
};

function hideModal(btn) {
  let modal;
  switch (btn) {
    case 'add-task-menu':
      modal = document.querySelector('#add-task-menu');
      break;
    case 'edit-task-menu':
      modal = document.querySelector('#edit-task-menu');
      modal.firstElementChild.dataset.taskId = null;
      break;
    // No default
  }

  modal.classList.toggle('visible');
  modal.dataset.activeModal = false;

  const form = modal.querySelector('form');
  setTimeout(() => form.reset(), 350);
  toggleBackdrop();
}

function hideMenu(btn) {
  let menu;
  switch (btn) {
    // case 'add-task-menu':
    //   menu = document.querySelector('#add-task-menu');
    //   break;
    // case 'edit-task-menu':
    //   menu = document.querySelector('#edit-task-menu');
    //   menu.firstElementChild.dataset.taskId = null;
    //   break;
    case 'add-project-menu':
      menu = document.querySelector('#add-project-menu');
      break;
    case 'rename-project-menu':
      menu = document.querySelector('#rename-project-menu');
      hideRename(menu);
      break;
    // No default
  }

  const form = menu.querySelector('form');
  form.reset();
  menu.classList.add('display-none');
}

const initializeModalHide = () => {
  const cancelBtns = document.querySelectorAll('.cancel-modal');
  cancelBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      hideModal(e.target.dataset.menu);
    });
  });
};

const initializeButtonEvents = () => {
  const cancelBtns = document.querySelectorAll('.cancel');
  cancelBtns.forEach((button) =>
    button.addEventListener('click', (e) => {
      hideMenu(e.target.dataset.menu);
    })
  );
};

const initializeForms = () => {
  const allForms = document.querySelectorAll('form');
  allForms.forEach((form) => {
    form.addEventListener('input', () => validateNameInput(form));
    form.addEventListener('submit', (e) => e.preventDefault());
  });
  setMinDate();
  updateSelectOptions();
};

const initializeFormController = () => {
  initializeModalHide();
  initializeButtonEvents();
  initializeForms();
};




/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "initializeProjects": () => (/* binding */ initializeProjects),
/* harmony export */   "projectMaster": () => (/* binding */ projectMaster),
/* harmony export */   "storeProjectList": () => (/* binding */ saveToLocalStorage)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/modules/tasks.js");



class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  taskList() {
    return _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMaster.findProject(this.id);
  }
}

// const projectFactory = (id, name) => {
//   const taskList = () => taskMaster.findProject(id);
//   return {
//     taskList,
//     get id() {
//       return id;
//     },
//     set id(newId) {
//       id = newId;
//     },
//     get name() {
//       return name;
//     },
//     set name(newName) {
//       name = newName;
//     },
//   };
// };

const projectMaster = (() => {
  const projectList = [];
  const push = (project) => projectList.push(project);
  const read = () => projectList;
  const findProject = (id) => {
    const idNum = Number(id);
    return projectList.find((project) => project.id === idNum);
  };
  const remove = (id) => {
    const idNum = Number(id);
    lodash__WEBPACK_IMPORTED_MODULE_0___default().remove(projectList, findProject(id));
    projectList.forEach((project) => {
      if (project.id > idNum) {
        project.taskList().forEach((task) => {
          task.projectId -= 1;
        });
        project.id -= 1;
      }
    });
  };

  return {
    push,
    read,
    findProject,
    remove,
  };
})();

const saveToLocalStorage = () => {
  localStorage.setItem('projectList', JSON.stringify(projectMaster.read()));
};

function initializeProjects() {
  if ('projectList' in localStorage) {
    let projects = JSON.parse(localStorage.getItem('projectList'));
    projects = lodash__WEBPACK_IMPORTED_MODULE_0___default().drop(projects, 1);
    projects.forEach((project) => {
      projectMaster.push(new Project(...Object.values(project)));
    });
  }
}




/***/ }),

/***/ "./src/modules/tasks.js":
/*!******************************!*\
  !*** ./src/modules/tasks.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task),
/* harmony export */   "initializeTasks": () => (/* binding */ initializeTasks),
/* harmony export */   "storeTaskList": () => (/* binding */ saveToLocalStorage),
/* harmony export */   "taskMaster": () => (/* binding */ taskMaster)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/parseJSON/index.js");



class Task {
  constructor(id, name, description, date, projectId, priority, completed = false) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.projectId = projectId;
    this.priority = priority;
    this.completed = completed;
  }

  toggleStatus() {
    this.completed = !this.completed
  }
}

// const taskFactory = (
//   id,
//   name,
//   description,
//   date,
//   projectId,
//   priority,
//   completed = false
// ) => {
//   return {
//     get id() {
//       return id;
//     },
//     set id(newId) {
//       id = newId;
//     },
//     get name() {
//       return name;
//     },
//     set name(newName) {
//       name = newName;
//     },
//     get description() {
//       return description;
//     },
//     set description(newDescription) {
//       description = newDescription;
//     },
//     get date() {
//       return date;
//     },
//     set date(newDate) {
//       date = newDate;
//     },
//     get projectId() {
//       return projectId;
//     },
//     set projectId(newProjectId) {
//       projectId = newProjectId;
//     },
//     get priority() {
//       return priority;
//     },
//     set priority(newPriority) {
//       priority = newPriority;
//     },
//     get completed() {
//       return completed;
//     },
//     set completed(newCompleted) {
//       completed = newCompleted;
//     },
//   };
// };

const taskMaster = (() => {
  const taskList = [];
  const push = (task) => taskList.push(task);
  const read = () => taskList;
  const findTask = (id) => {
    const idNum = Number(id);
    const thisTask = taskList.find((task) => task.id === idNum);
    return thisTask;
  };
  const findProject = (id) => {
    const projectIdNum = Number(id);
    const tasks = taskList.filter((task) => task.projectId === projectIdNum);
    return tasks;
  };
  const remove = (id) => {
    const idNum = Number(id);
    lodash__WEBPACK_IMPORTED_MODULE_0___default().remove(taskList, findTask(idNum));
    taskList.forEach((task) => {
      if (task.id > idNum) {
        task.id -= 1;
      }
    });
  };

  return {
    push,
    read,
    findTask,
    findProject,
    remove,
  };
})();

function saveToLocalStorage() {
  localStorage.setItem('taskList', JSON.stringify(taskMaster.read()));
}

function initializeTasks() {
  if ('taskList' in localStorage) {
    const tasks = JSON.parse(localStorage.getItem('taskList'));
    tasks.forEach((task) => {
      task.date = task.date ? (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(task.date) : null;
      taskMaster.push(new Task(...Object.values(task)));
    });
  }
}




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/modules/display.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvREFBUTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsb0RBQVM7QUFDdkM7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFPRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZm9ybS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGZvcm1hdCxcbiAgaXNXaXRoaW5JbnRlcnZhbCxcbiAgaXNUb2RheSxcbiAgYWRkRGF5cyxcbiAgc3RhcnRPZlRvZGF5LFxufSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdGFza01hc3Rlciwgc3RvcmVUYXNrTGlzdCwgaW5pdGlhbGl6ZVRhc2tzIH0gZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQge1xuICBwcm9qZWN0TWFzdGVyLFxuICBzdG9yZVByb2plY3RMaXN0LFxuICBpbml0aWFsaXplUHJvamVjdHMsXG59IGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHtcbiAgaW5pdGlhbGl6ZUZvcm1Db250cm9sbGVyLFxuICBzaG93RWRpdCxcbiAgc2hvd1JlbmFtZSxcbiAgdXBkYXRlU2VsZWN0T3B0aW9ucyxcbiAgdXBkYXRlU2VsZWN0VmFsdWVzLFxuICBoaWRlTW9kYWwsXG4gIC8vIGhpZGVNZW51LFxufSBmcm9tICcuL2Zvcm0tY29udHJvbGxlcic7XG5cbmNvbnN0IGdlbmVyYXRlVGFza0V2ZW50cyA9IChlbGVtZW50cywgdGFzaykgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIC8vIGxlZnRcbiAgICAgIGNvbnN0IGNoZWNrQ2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBjaGVja0NpcmNsZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICBjaGVja0NpcmNsZS5jbGFzc0xpc3QuYWRkKCdpdGVtLWNoZWNrJyk7XG4gICAgICBjaGVja0NpcmNsZS5kYXRhc2V0LnRhc2tJZCA9IHRhc2suaWQ7XG4gICAgICBjaGVja0NpcmNsZS5kYXRhc2V0LnByaW9yaXR5ID0gdGFzay5wcmlvcml0eTtcbiAgICAgIGNoZWNrQ2lyY2xlLmRhdGFzZXQuY29tcGxldGVkID0gdGFzay5jb21wbGV0ZWQ7XG4gICAgICBjaGVja0NpcmNsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICAgIGNvbXBsZXRlVGFzayhjaGVja0NpcmNsZS5kYXRhc2V0LnRhc2tJZClcbiAgICAgICk7XG4gICAgICBlbGVtZW50c1tpXS5pbnNlcnRCZWZvcmUoY2hlY2tDaXJjbGUsIGVsZW1lbnRzW2ldLmZpcnN0RWxlbWVudENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmlnaHRcbiAgICAgIGNvbnN0IHJpZ2h0U2lkZUJ0bnMgPSBbJ2l0ZW0tZWRpdCcsICdpdGVtLXJlbW92ZSddO1xuICAgICAgY29uc3QgaXRlbUJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGl0ZW1CdXR0b25zLmNsYXNzTGlzdC5hZGQoJ2l0ZW0tYnV0dG9ucycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByaWdodFNpZGVCdG5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChyaWdodFNpZGVCdG5zW2pdKTtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQudGFza0lkID0gdGFzay5pZDtcbiAgICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgICAgICAgc2hvd0VkaXQoYnV0dG9uLmRhdGFzZXQudGFza0lkKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgICAgICAgIHJlbW92ZVRhc2soYnV0dG9uLmRhdGFzZXQudGFza0lkKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbUJ1dHRvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnRzW2ldLmFwcGVuZChpdGVtQnV0dG9ucyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufTtcblxuY29uc3QgY3JlYXRlVGFza0l0ZW0gPSAodGFzaykgPT4ge1xuICBjb25zdCB0YXNrSWQgPSB0YXNrLmlkO1xuICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWl0ZW0nKTtcbiAgdGFza0l0ZW0uZGF0YXNldC50YXNrSWQgPSB0YXNrSWQ7XG5cbiAgY29uc3Qgc2VjdGlvbnMgPSBbJ2xlZnQnLCAncmlnaHQnXTtcbiAgbGV0IGVsZW1lbnRzID0gW107XG4gIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24pID0+IHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChzZWN0aW9uKTtcbiAgICBlbGVtZW50cy5wdXNoKGRpdik7XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdkZXRhaWxzJyk7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHRhc2submFtZTtcbiAgICAgIHBhcmEudGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSB0YXNrLmRhdGUgPyBmb3JtYXQodGFzay5kYXRlLCAnZCBNTU0geXl5eScpIDogJyc7XG4gICAgICBwYXJhLnRleHRDb250ZW50ID1cbiAgICAgICAgdGFzay5wcm9qZWN0SWQgPT09IDNcbiAgICAgICAgICA/ICcnXG4gICAgICAgICAgOiBwcm9qZWN0TWFzdGVyLmZpbmRQcm9qZWN0KHRhc2sucHJvamVjdElkKS5uYW1lO1xuICAgIH1cbiAgICBkZXRhaWxzLmFwcGVuZChoZWFkZXIsIHBhcmEpO1xuICAgIGVsZW1lbnRzW2ldLmFwcGVuZChkZXRhaWxzKTtcbiAgfVxuXG4gIGVsZW1lbnRzID0gZ2VuZXJhdGVUYXNrRXZlbnRzKGVsZW1lbnRzLCB0YXNrKTtcbiAgdGFza0l0ZW0uYXBwZW5kKC4uLmVsZW1lbnRzKTtcblxuICByZXR1cm4gdGFza0l0ZW07XG59O1xuXG5jb25zdCBzZXRBY3RpdmUgPSAoaWQpID0+IHtcbiAgY29uc3QgaWROdW0gPSBOdW1iZXIoaWQpO1xuICBjb25zdCBob21lSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZS1pdGVtJyk7XG4gIGNvbnN0IHByb2plY3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LWl0ZW0nKTtcblxuICBpZiAoaWQgPCA0KSB7XG4gICAgWy4uLnByb2plY3RJdGVtc10uZm9yRWFjaCgocEkpID0+XG4gICAgICBwSS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NldC1hY3RpdmUnKVxuICAgICk7XG4gICAgWy4uLmhvbWVJdGVtc10uZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaWYgKE51bWJlcihpLmRhdGFzZXQuc29ydElkKSA9PT0gaWROdW0pIHtcbiAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdzZXQtYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpLmNsYXNzTGlzdC5yZW1vdmUoJ3NldC1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBbLi4uaG9tZUl0ZW1zXS5mb3JFYWNoKChpKSA9PiBpLmNsYXNzTGlzdC5yZW1vdmUoJ3NldC1hY3RpdmUnKSk7XG4gICAgWy4uLnByb2plY3RJdGVtc10uZm9yRWFjaCgocEkpID0+IHtcbiAgICAgIGlmIChOdW1iZXIocEkuZGF0YXNldC5wcm9qZWN0SWQpID09PSBpZE51bSkge1xuICAgICAgICBwSS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldC1hY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBJLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2V0LWFjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCBnZW5lcmF0ZUVtcHR5U3BsYXNoID0gKCkgPT4ge1xuICBjb25zdCBwZW5kaW5nVGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVuZGluZy10YXNrLWxpc3QnKTtcbiAgY29uc3QgZW1wdHlTcGxhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgdGV4dCA9IFtcbiAgICAnQWxsIGdvb2QhJyxcbiAgICAnQWxsIGRvbmUhJyxcbiAgICBcIldoYXQncyB0aGUgcGxhbj9cIixcbiAgICBcIkxldCdzIGdldCBzdGFydGVkIVwiLFxuICAgICdXaGV3LCBubyB0YXNrcyEnLFxuICAgICdHb29kIHRvIGdvIScsXG4gIF07XG4gIGNvbnN0IGlsbHVzID0gWydpbGx1cy0wJywgJ2lsbHVzLTEnLCAnaWxsdXMtMicsICdpbGx1cy0zJywgJ2lsbHVzLTQnXTtcbiAgZW1wdHlTcGxhc2guY2xhc3NMaXN0LmFkZCgnZW1wdHktc3BsYXNoJyk7XG4gIGVtcHR5U3BsYXNoLnNldEF0dHJpYnV0ZShcbiAgICAnaWQnLFxuICAgIGlsbHVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGlsbHVzLmxlbmd0aCldXG4gICk7XG4gIGVtcHR5U3BsYXNoLnRleHRDb250ZW50ID0gdGV4dFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0ZXh0Lmxlbmd0aCldO1xuICBwZW5kaW5nVGFza0xpc3QuYXBwZW5kKGVtcHR5U3BsYXNoKTtcbn07XG5cbmNvbnN0IGNsZWFyVGFza0xpc3QgPSAoKSA9PiB7XG4gIGNvbnN0IHBlbmRpbmdUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZW5kaW5nLXRhc2stbGlzdCcpO1xuICBjb25zdCBjb21wbGV0ZWRUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQtdGFzay1saXN0Jyk7XG4gIHdoaWxlIChwZW5kaW5nVGFza0xpc3QuY2hpbGRFbGVtZW50Q291bnQgPiAwKSB7XG4gICAgcGVuZGluZ1Rhc2tMaXN0LnJlbW92ZUNoaWxkKHBlbmRpbmdUYXNrTGlzdC5maXJzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbiAgd2hpbGUgKGNvbXBsZXRlZFRhc2tMaXN0LmNoaWxkRWxlbWVudENvdW50ID4gMCkge1xuICAgIGNvbXBsZXRlZFRhc2tMaXN0LnJlbW92ZUNoaWxkKGNvbXBsZXRlZFRhc2tMaXN0LmZpcnN0RWxlbWVudENoaWxkKTtcbiAgfVxufTtcblxuY29uc3QgcmVuZGVyVGFza0xpc3QgPSAobGlzdE5hbWUsIGxpc3RJZCwgdGFza0xpc3QpID0+IHtcbiAgY29uc3QgbGlzdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpc3QtdGl0bGUnKTtcbiAgY29uc3QgbWFpbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1kaXNwbGF5Jyk7XG4gIGNvbnN0IHBlbmRpbmdUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZW5kaW5nLXRhc2stbGlzdCcpO1xuICBjb25zdCBjb21wbGV0ZWRUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQtdGFzay1saXN0Jyk7XG5cbiAgbGlzdFRpdGxlLnRleHRDb250ZW50ID0gbGlzdE5hbWU7XG4gIG1haW5EaXNwbGF5LmRhdGFzZXQubGlzdElkID0gbGlzdElkO1xuXG4gIGNsZWFyVGFza0xpc3QoKTtcblxuICBpZiAodGFza0xpc3QuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZWQpLmxlbmd0aCA8IDEpIHtcbiAgICBnZW5lcmF0ZUVtcHR5U3BsYXNoKCk7XG4gIH1cbiAgdGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gY3JlYXRlVGFza0l0ZW0odGFzayk7XG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICBjb21wbGV0ZWRUYXNrTGlzdC5pbnNlcnRCZWZvcmUoXG4gICAgICAgIGxpc3RJdGVtLFxuICAgICAgICBjb21wbGV0ZWRUYXNrTGlzdC5maXJzdEVsZW1lbnRDaGlsZFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGVuZGluZ1Rhc2tMaXN0Lmluc2VydEJlZm9yZShsaXN0SXRlbSwgcGVuZGluZ1Rhc2tMaXN0LmZpcnN0RWxlbWVudENoaWxkKTtcbiAgICB9XG4gIH0pO1xuICB1cGRhdGVTZWxlY3RWYWx1ZXMoKTtcbiAgc3RvcmVUYXNrTGlzdCgpO1xuICBzdG9yZVByb2plY3RMaXN0KCk7XG59O1xuXG5jb25zdCBmaW5kTGlzdCA9IChsaXN0SWQpID0+IHtcbiAgY29uc3QgaWROdW0gPSBOdW1iZXIobGlzdElkKTtcbiAgbGV0IHRhc2tMaXN0ID0gdGFza01hc3Rlci5yZWFkKCk7XG4gIGlmIChpZE51bSA8IDMpIHtcbiAgICBzd2l0Y2ggKGlkTnVtKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRhc2tMaXN0ID0gdGFza0xpc3QuZmlsdGVyKCh0YXNrKSA9PiBpc1RvZGF5KHRhc2suZGF0ZSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGFza0xpc3QgPSB0YXNrTGlzdC5maWx0ZXIoKHRhc2spID0+IGlzV2l0aGluV2Vlayh0YXNrKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gTm8gZGVmYXVsdFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0YXNrTGlzdCA9IHByb2plY3RNYXN0ZXIuZmluZFByb2plY3QoaWROdW0pLnRhc2tMaXN0KCk7XG4gIH1cbiAgcmV0dXJuIHRhc2tMaXN0O1xufTtcblxuY29uc3Qgb3Blbkxpc3QgPSAoaWQpID0+IHtcbiAgY29uc3QgaWROdW0gPSBOdW1iZXIoaWQpO1xuICBjb25zdCB0YXNrTGlzdCA9IGZpbmRMaXN0KGlkKTtcbiAgbGV0IGxpc3ROYW1lO1xuICBpZiAoaWROdW0gPCAzKSB7XG4gICAgc3dpdGNoIChpZE51bSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBsaXN0TmFtZSA9ICdBbGwnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgbGlzdE5hbWUgPSAnVG9kYXknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgbGlzdE5hbWUgPSAnTmV4dCA3IERheXMnO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIE5vIGRlZmF1bHRcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGlzdE5hbWUgPSBwcm9qZWN0TWFzdGVyLmZpbmRQcm9qZWN0KGlkKS5uYW1lO1xuICB9XG4gIHNldEFjdGl2ZShpZCk7XG4gIHJlbmRlclRhc2tMaXN0KGxpc3ROYW1lLCBpZCwgdGFza0xpc3QpO1xufTtcblxuY29uc3QgcmVsb2FkTGlzdCA9IChcbiAgaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1kaXNwbGF5JykuZGF0YXNldC5saXN0SWRcbikgPT4ge1xuICBvcGVuTGlzdChpZCk7XG59O1xuXG5jb25zdCBnZW5lcmF0ZVByb2plY3RFdmVudHMgPSAocHJvamVjdCwgcHJvamVjdEl0ZW0pID0+IHtcbiAgY29uc3QgcHJvamVjdExlZnQgPSBwcm9qZWN0SXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1sZWZ0Jyk7XG4gIHByb2plY3RMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3Blbkxpc3QocHJvamVjdC5pZCkpO1xuXG4gIGNvbnN0IHByb2plY3RSZW1vdmUgPSBwcm9qZWN0SXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1yZW1vdmUnKTtcbiAgcHJvamVjdFJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbW92ZVByb2plY3QocHJvamVjdEl0ZW0pKTtcblxuICBjb25zdCBwcm9qZWN0RWRpdCA9IHByb2plY3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWVkaXQnKTtcbiAgcHJvamVjdEVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgIHNob3dSZW5hbWUocHJvamVjdC5pZCwgcHJvamVjdEl0ZW0pXG4gICk7XG5cbiAgcmV0dXJuIHByb2plY3RJdGVtO1xufTtcblxuY29uc3QgY3JlYXRlUHJvamVjdEl0ZW0gPSAocHJvamVjdCkgPT4ge1xuICBjb25zdCBwcm9qZWN0SWQgPSBwcm9qZWN0LmlkO1xuICBjb25zdCBkaXNwbGF5V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXNwbGF5V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LXdyYXBwZXInKTtcbiAgbGV0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaXRlbScpO1xuICBwcm9qZWN0SXRlbS5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3RJZDtcblxuICBjb25zdCBwcm9qZWN0TGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcm9qZWN0TGVmdC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWxlZnQnKTtcbiAgY29uc3QgbmF2SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBuYXZJY29uLmNsYXNzTGlzdC5hZGQoJ25hdi1pY29uJywgJ3Byb2plY3QtaWNvbicpO1xuICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG4gIHByb2plY3RMZWZ0LmFwcGVuZChuYXZJY29uLCBwcm9qZWN0TmFtZSk7XG5cbiAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvamVjdEJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1idXR0b25zJyk7XG4gIGNvbnN0IGJ1dHRvbnMgPSBbJ3Byb2plY3QtZWRpdCcsICdwcm9qZWN0LXJlbW92ZSddO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChidXR0b25zW2ldKTtcbiAgICBidXR0b24uZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XG4gICAgcHJvamVjdEJ1dHRvbnMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuXG4gIHByb2plY3RJdGVtLmFwcGVuZChwcm9qZWN0TGVmdCwgcHJvamVjdEJ1dHRvbnMpO1xuICBwcm9qZWN0SXRlbSA9IGdlbmVyYXRlUHJvamVjdEV2ZW50cyhwcm9qZWN0LCBwcm9qZWN0SXRlbSk7XG4gIGRpc3BsYXlXcmFwcGVyLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcblxuICByZXR1cm4gZGlzcGxheVdyYXBwZXI7XG59O1xuXG5jb25zdCBhZGRQcm9qZWN0VG9MaXN0ID0gKHByb2plY3QpID0+IHtcbiAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gIGNvbnN0IHByb2plY3RJdGVtID0gY3JlYXRlUHJvamVjdEl0ZW0ocHJvamVjdCk7XG4gIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcbiAgdXBkYXRlU2VsZWN0T3B0aW9ucygpO1xuICB1cGRhdGVTZWxlY3RWYWx1ZXMoKTtcbiAgc3RvcmVUYXNrTGlzdCgpO1xuICBzdG9yZVByb2plY3RMaXN0KCk7XG59O1xuXG5jb25zdCB1cGRhdGVQcm9qZWN0TGlzdCA9IChpZCkgPT4ge1xuICBjb25zdCByZW5hbWVQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZW5hbWUtcHJvamVjdC1mb3JtJyk7XG4gIGNvbnN0IHsgcmVuYW1lSWQgfSA9IHJlbmFtZVByb2plY3RGb3JtLmRhdGFzZXQ7XG4gIGlmIChyZW5hbWVJZCAhPT0gJ251bGwnICYmIE51bWJlcihyZW5hbWVJZCkgPiBpZCkge1xuICAgIHJlbmFtZVByb2plY3RGb3JtLmRhdGFzZXQucmVuYW1lSWQgLT0gMTtcbiAgfVxuICBjb25zdCBwcm9qZWN0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0LWlkXScpO1xuICBbLi4ucHJvamVjdEVsZW1lbnRzXS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKE51bWJlcihlbGVtZW50LmRhdGFzZXQucHJvamVjdElkKSA+IGlkKSB7XG4gICAgICBlbGVtZW50LmRhdGFzZXQucHJvamVjdElkIC09IDE7XG4gICAgfVxuICB9KTtcbiAgdXBkYXRlU2VsZWN0T3B0aW9ucygpO1xuICB1cGRhdGVTZWxlY3RWYWx1ZXMoKTtcbiAgc3RvcmVUYXNrTGlzdCgpO1xuICBzdG9yZVByb2plY3RMaXN0KCk7XG59O1xuXG5mdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3RJdGVtKSB7XG4gIGNvbnN0IHByb2plY3RJZCA9IE51bWJlcihwcm9qZWN0SXRlbS5kYXRhc2V0LnByb2plY3RJZCk7XG4gIGxldCBsaXN0SWQgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tZGlzcGxheScpLmRhdGFzZXQubGlzdElkKTtcbiAgLy8gQWxzbyByZW1vdmVzIHRhc2tzIHRoYXQgYmVsb25nIHRvIHByb2plY3QgdG8gYmUgcmVtb3ZlZFxuICBjb25zdCBleGlzdGluZ1Rhc2tzID0gcHJvamVjdE1hc3Rlci5maW5kUHJvamVjdChwcm9qZWN0SWQpLnRhc2tMaXN0KCk7XG4gIGV4aXN0aW5nVGFza3MuZm9yRWFjaCgodGFzaykgPT4gdGFza01hc3Rlci5yZW1vdmUodGFzay5pZCkpO1xuICBwcm9qZWN0TWFzdGVyLnJlbW92ZShwcm9qZWN0SWQpO1xuICBwcm9qZWN0SXRlbS5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuXG4gIGlmIChsaXN0SWQgPiBwcm9qZWN0SWQpIHtcbiAgICBsaXN0SWQgLT0gMTtcbiAgICBvcGVuTGlzdChsaXN0SWQpO1xuICB9IGVsc2UgaWYgKGxpc3RJZCA9PT0gcHJvamVjdElkKSB7XG4gICAgLy8gT3BlbnMgaW5ib3hcbiAgICBvcGVuTGlzdCgzKTtcbiAgfSBlbHNlIHtcbiAgICByZWxvYWRMaXN0KCk7XG4gIH1cbiAgdXBkYXRlUHJvamVjdExpc3QocHJvamVjdElkKTtcbiAgLy8gaGlkZU1lbnUoJ2VkaXQtdGFzay1tZW51Jyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRhc2soaWQpIHtcbiAgdGFza01hc3Rlci5yZW1vdmUoaWQpO1xuICByZWxvYWRMaXN0KCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ29tcGxldGVkVGFza3MoKSB7XG4gIGNvbnN0IGN1cnJlbnRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tZGlzcGxheScpLmRhdGFzZXQubGlzdElkO1xuICBjb25zdCB0YXNrTGlzdCA9IGZpbmRMaXN0KGN1cnJlbnRMaXN0KTtcbiAgY29uc3QgY29tcGxldGVkVGFza3MgPSB0YXNrTGlzdC5maWx0ZXIoKHRhc2spID0+IHRhc2suY29tcGxldGVkID09PSB0cnVlKTtcbiAgY29tcGxldGVkVGFza3MuZm9yRWFjaCgodGFzaykgPT4gcmVtb3ZlVGFzayh0YXNrLmlkKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBsZXRlVGFzayhpZCkge1xuICBjb25zdCB0aGlzVGFzayA9IHRhc2tNYXN0ZXIuZmluZFRhc2soaWQpO1xuICB0aGlzVGFzay50b2dnbGVTdGF0dXMoKTtcbiAgcmVsb2FkTGlzdCgpO1xufVxuXG5mdW5jdGlvbiBpc1dpdGhpbldlZWsodGFzaykge1xuICByZXR1cm4gaXNXaXRoaW5JbnRlcnZhbCh0YXNrLmRhdGUsIHtcbiAgICBzdGFydDogc3RhcnRPZlRvZGF5KCksXG4gICAgZW5kOiBhZGREYXlzKHN0YXJ0T2ZUb2RheSgpLCA4KSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVFdmVudHMoKSB7XG4gIGNvbnN0IGhvbWVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lLWl0ZW0nKTtcbiAgaG9tZUxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3Blbkxpc3QobGluay5kYXRhc2V0LnNvcnRJZCkpO1xuICB9KTtcblxuICBjb25zdCByZW1vdmVDb21wbGV0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVtb3ZlLWNvbXBsZXRlZCcpO1xuICByZW1vdmVDb21wbGV0ZWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGVhckNvbXBsZXRlZFRhc2tzKTtcblxuICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZHJvcCcpO1xuICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBhY3RpdmVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjdGl2ZS1tb2RhbD1cInRydWVcIl0nKTtcbiAgICBoaWRlTW9kYWwoYWN0aXZlTW9kYWwuaWQpO1xuICB9KTtcblxuICBjb25zdCBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGFtYnVyZ2VyJyk7XG4gIGNvbnN0IGhhbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNoYW1idXJnZXIgPiBkaXYnKTtcbiAgY29uc3QgWy4uLm5hdkRpc3BsYXldID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI21haW4tZGlzcGxheSwgbmF2Jyk7XG4gIGhhbWJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBoYW0uZm9yRWFjaCgoZGl2KSA9PiBkaXYuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpKTtcbiAgICBuYXZEaXNwbGF5LmZvckVhY2goKGRpdikgPT4gZGl2LmNsYXNzTGlzdC50b2dnbGUoJ3NsaWRlLW9wZW4nKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXRyaWV2ZVN0b3JhZ2UoKSB7XG4gIGluaXRpYWxpemVUYXNrcygpO1xuICBpbml0aWFsaXplUHJvamVjdHMoKTtcbiAgY29uc3Qgc3RvcmVkUHJvamVjdExpc3QgPSBfLmRyb3AocHJvamVjdE1hc3Rlci5yZWFkKCksIDEpO1xuICBzdG9yZWRQcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiBhZGRQcm9qZWN0VG9MaXN0KHByb2plY3QpKTtcbn1cblxuLy8gZnVuY3Rpb24gYmFja2Ryb3BIaWRlU2VsZigpIHt9XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVVSSgpIHtcbiAgcmV0cmlldmVTdG9yYWdlKCk7XG4gIGluaXRpYWxpemVGb3JtQ29udHJvbGxlcigpO1xuICBpbml0aWFsaXplRXZlbnRzKCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gb3Blbkxpc3QoMykpO1xufVxuXG5leHBvcnQgeyBpbml0aWFsaXplVUksIHJlbG9hZExpc3QsIGFkZFByb2plY3RUb0xpc3QgfTtcbiIsImltcG9ydCB7IGZvcm1hdCwgc3RhcnRPZlRvZGF5IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgdGFza01hc3RlciB9IGZyb20gJy4vdGFza3MnO1xuaW1wb3J0IHsgcHJvamVjdE1hc3RlciB9IGZyb20gJy4vcHJvamVjdHMnO1xuXG4vLyBjb25zdCBpbnNlcnRUb3AgPSAobWVudSkgPT4ge1xuLy8gICBjb25zdCBtZW51c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudXMnKTtcbi8vICAgbWVudXNTZWN0aW9uLmluc2VydEJlZm9yZShtZW51LCBtZW51c1NlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQpO1xuLy8gfTtcblxuY29uc3QgdG9nZ2xlQmFja2Ryb3AgPSAoKSA9PiB7XG4gIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JhY2tkcm9wJyk7XG4gIGJhY2tkcm9wLmNsYXNzTGlzdC50b2dnbGUoJ3Zpc2libGUnKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVNlbGVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gIC8vIGNvbnN0IG1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lbnVzJyk7XG4gIGNvbnN0IG1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tZGlzcGxheScpO1xuICBjb25zdCBmb3JtcyA9IG1lbnVzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcbiAgZm9ybXMuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RTZWxlY3QgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgIHdoaWxlIChwcm9qZWN0U2VsZWN0LmNoaWxkRWxlbWVudENvdW50ID4gMCkge1xuICAgICAgcHJvamVjdFNlbGVjdC5yZW1vdmVDaGlsZChwcm9qZWN0U2VsZWN0LmZpcnN0RWxlbWVudENoaWxkKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IHByb2plY3RNYXN0ZXIucmVhZCgpO1xuICAgIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICAgICAgb3B0aW9uLnZhbHVlID0gcHJvamVjdC5pZDtcbiAgICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCB1cGRhdGVTZWxlY3RWYWx1ZXMgPSAoKSA9PiB7XG4gIGNvbnN0IGxpc3RJZCA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1kaXNwbGF5JykuZGF0YXNldC5saXN0SWQpO1xuICBjb25zdCBhZGRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1mb3JtJyk7XG4gIGNvbnN0IHByb2plY3RTZWxlY3RBZGQgPSBhZGRUYXNrRm9ybS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgcHJvamVjdFNlbGVjdEFkZC52YWx1ZSA9IGxpc3RJZCA+IDMgPyBsaXN0SWQgOiAzO1xufTtcblxuY29uc3QgdmFsaWRhdGVOYW1lSW5wdXQgPSAoZm9ybSkgPT4ge1xuICBjb25zdCBuYW1lRmllbGQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gIGNvbnN0IHN1Ym1pdCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLnN1Ym1pdCcpO1xuICBpZiAobmFtZUZpZWxkLnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgc3VibWl0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfSBlbHNlIHtcbiAgICBzdWJtaXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcgJyk7XG4gIH1cbn07XG5cbmNvbnN0IHNob3dBZGQgPSAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tZGlzcGxheScpLmRhdGFzZXQubGlzdElkO1xuICBjb25zdCBhZGRUYXNrTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1tZW51Jyk7XG4gIGNvbnN0IGFkZFRhc2tGb3JtID0gYWRkVGFza01lbnUucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICBjb25zdCBkYXRlSW5wdXQgPSBhZGRUYXNrRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiZGF0ZVwiXScpO1xuICBhZGRUYXNrRm9ybS5yZXNldCgpO1xuICBhZGRUYXNrTWVudS5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJyk7XG4gIGFkZFRhc2tNZW51LmRhdGFzZXQuYWN0aXZlTW9kYWwgPSB0cnVlO1xuXG4gIGlmIChOdW1iZXIoY3VycmVudExpc3QpID09PSAxKSB7XG4gICAgZGF0ZUlucHV0LnZhbHVlID0gZm9ybWF0KHN0YXJ0T2ZUb2RheSgpLCAneXl5eS1NTS1kZCcpO1xuICB9XG5cbiAgdG9nZ2xlQmFja2Ryb3AoKTtcbiAgdXBkYXRlU2VsZWN0VmFsdWVzKCk7XG4gIHZhbGlkYXRlTmFtZUlucHV0KGFkZFRhc2tGb3JtKTtcbn07XG5cbmNvbnN0IGdldFRhc2tJbmZvID0gKGlkKSA9PiB7XG4gIGNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stZm9ybScpO1xuICBjb25zdCBlZGl0TmFtZSA9IGVkaXRUYXNrRm9ybS5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lLWVkaXQnKTtcbiAgY29uc3QgZWRpdERlc2NyaXB0aW9uID0gZWRpdFRhc2tGb3JtLnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRlc2NyaXB0aW9uLWVkaXQnKTtcbiAgY29uc3QgZWRpdERhdGUgPSBlZGl0VGFza0Zvcm0ucXVlcnlTZWxlY3RvcignI3Rhc2stZGF0ZS1lZGl0Jyk7XG4gIGNvbnN0IGVkaXRQcm9qZWN0ID0gZWRpdFRhc2tGb3JtLnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWVkaXQnKTtcbiAgY29uc3QgZWRpdFByaW9yaXR5ID0gZWRpdFRhc2tGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ2lucHV0W25hbWU9cHJpb3JpdHktZWRpdF0nXG4gICk7XG5cbiAgY29uc3QgdGhpc1Rhc2sgPSB0YXNrTWFzdGVyLmZpbmRUYXNrKGlkKTtcbiAgZWRpdE5hbWUudmFsdWUgPSB0aGlzVGFzay5uYW1lO1xuICBlZGl0RGVzY3JpcHRpb24udmFsdWUgPSB0aGlzVGFzay5kZXNjcmlwdGlvbjtcbiAgZWRpdERhdGUudmFsdWUgPSAhdGhpc1Rhc2suZGF0ZSA/ICcnIDogZm9ybWF0KHRoaXNUYXNrLmRhdGUsICd5eXl5LU1NLWRkJyk7XG4gIGVkaXRQcm9qZWN0LnZhbHVlID0gdGhpc1Rhc2sucHJvamVjdElkO1xuICBlZGl0UHJpb3JpdHkuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBpZiAoaW5wdXQudmFsdWUgPT09IHRoaXNUYXNrLnByaW9yaXR5KSB7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBzaG93RWRpdCA9IChpZCkgPT4ge1xuICBjb25zdCBzaG93RWRpdE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLW1lbnUnKTtcbiAgY29uc3QgZWRpdFRhc2tGb3JtID0gc2hvd0VkaXRNZW51LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblxuICBzaG93RWRpdE1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScpO1xuICBzaG93RWRpdE1lbnUuZGF0YXNldC5hY3RpdmVNb2RhbCA9IHRydWU7XG5cbiAgZWRpdFRhc2tGb3JtLmRhdGFzZXQudGFza0lkID0gaWQ7XG4gIHRvZ2dsZUJhY2tkcm9wKCk7XG4gIGdldFRhc2tJbmZvKGlkKTtcbiAgdmFsaWRhdGVOYW1lSW5wdXQoZWRpdFRhc2tGb3JtKTtcbn07XG5cbmNvbnN0IHNob3dBZGRQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCBzaG93QWRkUHJvamVjdE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtbWVudScpO1xuICBjb25zdCBhZGRQcm9qZWN0Rm9ybSA9IHNob3dBZGRQcm9qZWN0TWVudS5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gIHNob3dBZGRQcm9qZWN0TWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbiAgdmFsaWRhdGVOYW1lSW5wdXQoYWRkUHJvamVjdEZvcm0pO1xufTtcblxuY29uc3Qgc2hvd1JlbmFtZSA9IChpZCwgcHJvamVjdEl0ZW0pID0+IHtcbiAgY29uc3QgcmVuYW1lUHJvamVjdE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVuYW1lLXByb2plY3QtbWVudScpO1xuICBjb25zdCByZW5hbWVQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZW5hbWUtcHJvamVjdC1mb3JtJyk7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IHJlbmFtZVByb2plY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICBjb25zdCB0aGlzSXRlbSA9IHByb2plY3RJdGVtLnBhcmVudEVsZW1lbnQ7XG5cbiAgaWYgKHJlbmFtZVByb2plY3RGb3JtLmRhdGFzZXQucHJvamVjdElkICE9PSAnbnVsbCcpIHtcbiAgICBoaWRlTWVudSgncmVuYW1lLXByb2plY3QtbWVudScpO1xuICB9XG5cbiAgcmVuYW1lUHJvamVjdEZvcm0uZGF0YXNldC5yZW5hbWVJZCA9IGlkO1xuICBuYW1lSW5wdXQudmFsdWUgPSBwcm9qZWN0TWFzdGVyLmZpbmRQcm9qZWN0KGlkKS5uYW1lO1xuICBwcm9qZWN0TGlzdC5pbnNlcnRCZWZvcmUocmVuYW1lUHJvamVjdE1lbnUsIHRoaXNJdGVtKTtcbiAgdGhpc0l0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1ub25lJyk7XG4gIHJlbmFtZVByb2plY3RNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xuICB2YWxpZGF0ZU5hbWVJbnB1dChyZW5hbWVQcm9qZWN0Rm9ybSk7XG59O1xuXG5jb25zdCBoaWRlUmVuYW1lID0gKG1lbnUpID0+IHtcbiAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gIGNvbnN0IHJlbmFtZU1lbnUgPSBtZW51O1xuICBjb25zdCByZW5hbWVGb3JtID0gbWVudS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgcmVuYW1lRm9ybS5kYXRhc2V0LnJlbmFtZUlkID0gbnVsbDtcbiAgcmVuYW1lTWVudS5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG4gIHByb2plY3RMaXN0Lmluc2VydEJlZm9yZShyZW5hbWVNZW51LCBwcm9qZWN0TGlzdC5maXJzdEVsZW1lbnRDaGlsZCk7XG59O1xuXG4vLyBjb25zdCBzcXVhc2hFZGl0ID0gKGlkKSA9PiB7XG4vLyAgIGNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stZm9ybScpO1xuXG4vLyAgIGlmICghW2lkLCBlZGl0VGFza0Zvcm0uZGF0YXNldC50YXNrSWRdLmluY2x1ZGVzKCdudWxsJykpIHtcbi8vICAgICBjb25zdCBpZE51bSA9IE51bWJlcihpZCk7XG4vLyAgICAgY29uc3QgZWxlbWVudElkID0gTnVtYmVyKGVkaXRUYXNrRm9ybS5kYXRhc2V0LnRhc2tJZCk7XG5cbi8vICAgICBpZiAoaWROdW0gPT09IGVsZW1lbnRJZCkge1xuLy8gICAgICAgaGlkZU1lbnUoZWRpdFRhc2tGb3JtLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpKTtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH07XG5cbmNvbnN0IHNldE1pbkRhdGUgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGVJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPWRhdGVdJyk7XG4gIGNvbnN0IHRvZGF5ID0gZm9ybWF0KG5ldyBEYXRlKCksICd5eXl5LU1NLWRkJyk7XG4gIGRhdGVJbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IGlucHV0LnNldEF0dHJpYnV0ZSgnbWluJywgdG9kYXkpKTtcbn07XG5cbmZ1bmN0aW9uIGhpZGVNb2RhbChidG4pIHtcbiAgbGV0IG1vZGFsO1xuICBzd2l0Y2ggKGJ0bikge1xuICAgIGNhc2UgJ2FkZC10YXNrLW1lbnUnOlxuICAgICAgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stbWVudScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZWRpdC10YXNrLW1lbnUnOlxuICAgICAgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLW1lbnUnKTtcbiAgICAgIG1vZGFsLmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQudGFza0lkID0gbnVsbDtcbiAgICAgIGJyZWFrO1xuICAgIC8vIE5vIGRlZmF1bHRcbiAgfVxuXG4gIG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Zpc2libGUnKTtcbiAgbW9kYWwuZGF0YXNldC5hY3RpdmVNb2RhbCA9IGZhbHNlO1xuXG4gIGNvbnN0IGZvcm0gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gIHNldFRpbWVvdXQoKCkgPT4gZm9ybS5yZXNldCgpLCAzNTApO1xuICB0b2dnbGVCYWNrZHJvcCgpO1xufVxuXG5mdW5jdGlvbiBoaWRlTWVudShidG4pIHtcbiAgbGV0IG1lbnU7XG4gIHN3aXRjaCAoYnRuKSB7XG4gICAgLy8gY2FzZSAnYWRkLXRhc2stbWVudSc6XG4gICAgLy8gICBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLW1lbnUnKTtcbiAgICAvLyAgIGJyZWFrO1xuICAgIC8vIGNhc2UgJ2VkaXQtdGFzay1tZW51JzpcbiAgICAvLyAgIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLW1lbnUnKTtcbiAgICAvLyAgIG1lbnUuZmlyc3RFbGVtZW50Q2hpbGQuZGF0YXNldC50YXNrSWQgPSBudWxsO1xuICAgIC8vICAgYnJlYWs7XG4gICAgY2FzZSAnYWRkLXByb2plY3QtbWVudSc6XG4gICAgICBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LW1lbnUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlbmFtZS1wcm9qZWN0LW1lbnUnOlxuICAgICAgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZW5hbWUtcHJvamVjdC1tZW51Jyk7XG4gICAgICBoaWRlUmVuYW1lKG1lbnUpO1xuICAgICAgYnJlYWs7XG4gICAgLy8gTm8gZGVmYXVsdFxuICB9XG5cbiAgY29uc3QgZm9ybSA9IG1lbnUucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICBmb3JtLnJlc2V0KCk7XG4gIG1lbnUuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1ub25lJyk7XG59XG5cbmNvbnN0IGluaXRpYWxpemVNb2RhbEhpZGUgPSAoKSA9PiB7XG4gIGNvbnN0IGNhbmNlbEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FuY2VsLW1vZGFsJyk7XG4gIGNhbmNlbEJ0bnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGhpZGVNb2RhbChlLnRhcmdldC5kYXRhc2V0Lm1lbnUpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IGluaXRpYWxpemVCdXR0b25FdmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGNhbmNlbEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FuY2VsJyk7XG4gIGNhbmNlbEJ0bnMuZm9yRWFjaCgoYnV0dG9uKSA9PlxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBoaWRlTWVudShlLnRhcmdldC5kYXRhc2V0Lm1lbnUpO1xuICAgIH0pXG4gICk7XG59O1xuXG5jb25zdCBpbml0aWFsaXplRm9ybXMgPSAoKSA9PiB7XG4gIGNvbnN0IGFsbEZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICBhbGxGb3Jtcy5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHZhbGlkYXRlTmFtZUlucHV0KGZvcm0pKTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICB9KTtcbiAgc2V0TWluRGF0ZSgpO1xuICB1cGRhdGVTZWxlY3RPcHRpb25zKCk7XG59O1xuXG5jb25zdCBpbml0aWFsaXplRm9ybUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGluaXRpYWxpemVNb2RhbEhpZGUoKTtcbiAgaW5pdGlhbGl6ZUJ1dHRvbkV2ZW50cygpO1xuICBpbml0aWFsaXplRm9ybXMoKTtcbn07XG5cbmV4cG9ydCB7XG4gIGluaXRpYWxpemVGb3JtQ29udHJvbGxlcixcbiAgc2hvd0FkZCxcbiAgc2hvd0FkZFByb2plY3QsXG4gIHNob3dFZGl0LFxuICBoaWRlTWVudSxcbiAgaGlkZU1vZGFsLFxuICB1cGRhdGVTZWxlY3RPcHRpb25zLFxuICB1cGRhdGVTZWxlY3RWYWx1ZXMsXG4gIC8vIHNxdWFzaEVkaXQsXG4gIHNob3dSZW5hbWUsXG59O1xuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHRhc2tNYXN0ZXIgfSBmcm9tICcuL3Rhc2tzJztcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKGlkLCBuYW1lKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICB0YXNrTGlzdCgpIHtcbiAgICByZXR1cm4gdGFza01hc3Rlci5maW5kUHJvamVjdCh0aGlzLmlkKTtcbiAgfVxufVxuXG4vLyBjb25zdCBwcm9qZWN0RmFjdG9yeSA9IChpZCwgbmFtZSkgPT4ge1xuLy8gICBjb25zdCB0YXNrTGlzdCA9ICgpID0+IHRhc2tNYXN0ZXIuZmluZFByb2plY3QoaWQpO1xuLy8gICByZXR1cm4ge1xuLy8gICAgIHRhc2tMaXN0LFxuLy8gICAgIGdldCBpZCgpIHtcbi8vICAgICAgIHJldHVybiBpZDtcbi8vICAgICB9LFxuLy8gICAgIHNldCBpZChuZXdJZCkge1xuLy8gICAgICAgaWQgPSBuZXdJZDtcbi8vICAgICB9LFxuLy8gICAgIGdldCBuYW1lKCkge1xuLy8gICAgICAgcmV0dXJuIG5hbWU7XG4vLyAgICAgfSxcbi8vICAgICBzZXQgbmFtZShuZXdOYW1lKSB7XG4vLyAgICAgICBuYW1lID0gbmV3TmFtZTtcbi8vICAgICB9LFxuLy8gICB9O1xuLy8gfTtcblxuY29uc3QgcHJvamVjdE1hc3RlciA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RMaXN0ID0gW107XG4gIGNvbnN0IHB1c2ggPSAocHJvamVjdCkgPT4gcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgY29uc3QgcmVhZCA9ICgpID0+IHByb2plY3RMaXN0O1xuICBjb25zdCBmaW5kUHJvamVjdCA9IChpZCkgPT4ge1xuICAgIGNvbnN0IGlkTnVtID0gTnVtYmVyKGlkKTtcbiAgICByZXR1cm4gcHJvamVjdExpc3QuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gaWROdW0pO1xuICB9O1xuICBjb25zdCByZW1vdmUgPSAoaWQpID0+IHtcbiAgICBjb25zdCBpZE51bSA9IE51bWJlcihpZCk7XG4gICAgXy5yZW1vdmUocHJvamVjdExpc3QsIGZpbmRQcm9qZWN0KGlkKSk7XG4gICAgcHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QuaWQgPiBpZE51bSkge1xuICAgICAgICBwcm9qZWN0LnRhc2tMaXN0KCkuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgIHRhc2sucHJvamVjdElkIC09IDE7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9qZWN0LmlkIC09IDE7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwdXNoLFxuICAgIHJlYWQsXG4gICAgZmluZFByb2plY3QsXG4gICAgcmVtb3ZlLFxuICB9O1xufSkoKTtcblxuY29uc3Qgc2F2ZVRvTG9jYWxTdG9yYWdlID0gKCkgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdExpc3QnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TWFzdGVyLnJlYWQoKSkpO1xufTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVByb2plY3RzKCkge1xuICBpZiAoJ3Byb2plY3RMaXN0JyBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0TGlzdCcpKTtcbiAgICBwcm9qZWN0cyA9IF8uZHJvcChwcm9qZWN0cywgMSk7XG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgcHJvamVjdE1hc3Rlci5wdXNoKG5ldyBQcm9qZWN0KC4uLk9iamVjdC52YWx1ZXMocHJvamVjdCkpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBQcm9qZWN0LFxuICBwcm9qZWN0TWFzdGVyLFxuICBzYXZlVG9Mb2NhbFN0b3JhZ2UgYXMgc3RvcmVQcm9qZWN0TGlzdCxcbiAgaW5pdGlhbGl6ZVByb2plY3RzLFxufTtcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBwYXJzZUpTT04gfSBmcm9tICdkYXRlLWZucyc7XG5cbmNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByb2plY3RJZCwgcHJpb3JpdHksIGNvbXBsZXRlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5wcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICB9XG5cbiAgdG9nZ2xlU3RhdHVzKCkge1xuICAgIHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkXG4gIH1cbn1cblxuLy8gY29uc3QgdGFza0ZhY3RvcnkgPSAoXG4vLyAgIGlkLFxuLy8gICBuYW1lLFxuLy8gICBkZXNjcmlwdGlvbixcbi8vICAgZGF0ZSxcbi8vICAgcHJvamVjdElkLFxuLy8gICBwcmlvcml0eSxcbi8vICAgY29tcGxldGVkID0gZmFsc2Vcbi8vICkgPT4ge1xuLy8gICByZXR1cm4ge1xuLy8gICAgIGdldCBpZCgpIHtcbi8vICAgICAgIHJldHVybiBpZDtcbi8vICAgICB9LFxuLy8gICAgIHNldCBpZChuZXdJZCkge1xuLy8gICAgICAgaWQgPSBuZXdJZDtcbi8vICAgICB9LFxuLy8gICAgIGdldCBuYW1lKCkge1xuLy8gICAgICAgcmV0dXJuIG5hbWU7XG4vLyAgICAgfSxcbi8vICAgICBzZXQgbmFtZShuZXdOYW1lKSB7XG4vLyAgICAgICBuYW1lID0gbmV3TmFtZTtcbi8vICAgICB9LFxuLy8gICAgIGdldCBkZXNjcmlwdGlvbigpIHtcbi8vICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbi8vICAgICB9LFxuLy8gICAgIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuLy8gICAgICAgZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbi8vICAgICB9LFxuLy8gICAgIGdldCBkYXRlKCkge1xuLy8gICAgICAgcmV0dXJuIGRhdGU7XG4vLyAgICAgfSxcbi8vICAgICBzZXQgZGF0ZShuZXdEYXRlKSB7XG4vLyAgICAgICBkYXRlID0gbmV3RGF0ZTtcbi8vICAgICB9LFxuLy8gICAgIGdldCBwcm9qZWN0SWQoKSB7XG4vLyAgICAgICByZXR1cm4gcHJvamVjdElkO1xuLy8gICAgIH0sXG4vLyAgICAgc2V0IHByb2plY3RJZChuZXdQcm9qZWN0SWQpIHtcbi8vICAgICAgIHByb2plY3RJZCA9IG5ld1Byb2plY3RJZDtcbi8vICAgICB9LFxuLy8gICAgIGdldCBwcmlvcml0eSgpIHtcbi8vICAgICAgIHJldHVybiBwcmlvcml0eTtcbi8vICAgICB9LFxuLy8gICAgIHNldCBwcmlvcml0eShuZXdQcmlvcml0eSkge1xuLy8gICAgICAgcHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbi8vICAgICB9LFxuLy8gICAgIGdldCBjb21wbGV0ZWQoKSB7XG4vLyAgICAgICByZXR1cm4gY29tcGxldGVkO1xuLy8gICAgIH0sXG4vLyAgICAgc2V0IGNvbXBsZXRlZChuZXdDb21wbGV0ZWQpIHtcbi8vICAgICAgIGNvbXBsZXRlZCA9IG5ld0NvbXBsZXRlZDtcbi8vICAgICB9LFxuLy8gICB9O1xuLy8gfTtcblxuY29uc3QgdGFza01hc3RlciA9ICgoKSA9PiB7XG4gIGNvbnN0IHRhc2tMaXN0ID0gW107XG4gIGNvbnN0IHB1c2ggPSAodGFzaykgPT4gdGFza0xpc3QucHVzaCh0YXNrKTtcbiAgY29uc3QgcmVhZCA9ICgpID0+IHRhc2tMaXN0O1xuICBjb25zdCBmaW5kVGFzayA9IChpZCkgPT4ge1xuICAgIGNvbnN0IGlkTnVtID0gTnVtYmVyKGlkKTtcbiAgICBjb25zdCB0aGlzVGFzayA9IHRhc2tMaXN0LmZpbmQoKHRhc2spID0+IHRhc2suaWQgPT09IGlkTnVtKTtcbiAgICByZXR1cm4gdGhpc1Rhc2s7XG4gIH07XG4gIGNvbnN0IGZpbmRQcm9qZWN0ID0gKGlkKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdElkTnVtID0gTnVtYmVyKGlkKTtcbiAgICBjb25zdCB0YXNrcyA9IHRhc2tMaXN0LmZpbHRlcigodGFzaykgPT4gdGFzay5wcm9qZWN0SWQgPT09IHByb2plY3RJZE51bSk7XG4gICAgcmV0dXJuIHRhc2tzO1xuICB9O1xuICBjb25zdCByZW1vdmUgPSAoaWQpID0+IHtcbiAgICBjb25zdCBpZE51bSA9IE51bWJlcihpZCk7XG4gICAgXy5yZW1vdmUodGFza0xpc3QsIGZpbmRUYXNrKGlkTnVtKSk7XG4gICAgdGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgaWYgKHRhc2suaWQgPiBpZE51bSkge1xuICAgICAgICB0YXNrLmlkIC09IDE7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwdXNoLFxuICAgIHJlYWQsXG4gICAgZmluZFRhc2ssXG4gICAgZmluZFByb2plY3QsXG4gICAgcmVtb3ZlLFxuICB9O1xufSkoKTtcblxuZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza0xpc3QnLCBKU09OLnN0cmluZ2lmeSh0YXNrTWFzdGVyLnJlYWQoKSkpO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplVGFza3MoKSB7XG4gIGlmICgndGFza0xpc3QnIGluIGxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza0xpc3QnKSk7XG4gICAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgdGFzay5kYXRlID0gdGFzay5kYXRlID8gcGFyc2VKU09OKHRhc2suZGF0ZSkgOiBudWxsO1xuICAgICAgdGFza01hc3Rlci5wdXNoKG5ldyBUYXNrKC4uLk9iamVjdC52YWx1ZXModGFzaykpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBUYXNrLFxuICB0YXNrTWFzdGVyLFxuICBzYXZlVG9Mb2NhbFN0b3JhZ2UgYXMgc3RvcmVUYXNrTGlzdCxcbiAgaW5pdGlhbGl6ZVRhc2tzLFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==