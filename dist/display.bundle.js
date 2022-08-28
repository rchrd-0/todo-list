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

function initializeButtonEvents() {
  const homeLinks = document.querySelectorAll('.home-item');
  homeLinks.forEach((link) => {
    link.addEventListener('click', () => openList(link.dataset.sortId));
  });
  const removeCompleted = document.querySelector('#remove-completed');
  removeCompleted.addEventListener('click', clearCompletedTasks);
}

function retrieveStorage() {
  (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.initializeTasks)();
  (0,_projects__WEBPACK_IMPORTED_MODULE_2__.initializeProjects)();
  const storedProjectList = lodash__WEBPACK_IMPORTED_MODULE_0___default().drop(_projects__WEBPACK_IMPORTED_MODULE_2__.projectMaster.read(), 1);
  storedProjectList.forEach((project) => addProjectToList(project));
}

function backdropHideSelf() {
  const backdrop = document.querySelector('#backdrop');

  backdrop.addEventListener('click', () => {
    const activeModal = document.querySelector('[data-active-modal="true"]');
    (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.hideModal)(activeModal.id);
  });
}

function initializeUI() {
  backdropHideSelf();
  retrieveStorage();
  (0,_form_controller__WEBPACK_IMPORTED_MODULE_3__.initializeFormController)();
  initializeButtonEvents();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0RBQVE7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG9EQUFTO0FBQ3ZDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBT0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Zvcm0tY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBmb3JtYXQsXG4gIGlzV2l0aGluSW50ZXJ2YWwsXG4gIGlzVG9kYXksXG4gIGFkZERheXMsXG4gIHN0YXJ0T2ZUb2RheSxcbn0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHRhc2tNYXN0ZXIsIHN0b3JlVGFza0xpc3QsIGluaXRpYWxpemVUYXNrcyB9IGZyb20gJy4vdGFza3MnO1xuaW1wb3J0IHtcbiAgcHJvamVjdE1hc3RlcixcbiAgc3RvcmVQcm9qZWN0TGlzdCxcbiAgaW5pdGlhbGl6ZVByb2plY3RzLFxufSBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB7XG4gIGluaXRpYWxpemVGb3JtQ29udHJvbGxlcixcbiAgc2hvd0VkaXQsXG4gIHNob3dSZW5hbWUsXG4gIHVwZGF0ZVNlbGVjdE9wdGlvbnMsXG4gIHVwZGF0ZVNlbGVjdFZhbHVlcyxcbiAgaGlkZU1vZGFsLFxuICAvLyBoaWRlTWVudSxcbn0gZnJvbSAnLi9mb3JtLWNvbnRyb2xsZXInO1xuXG5jb25zdCBnZW5lcmF0ZVRhc2tFdmVudHMgPSAoZWxlbWVudHMsIHRhc2spID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpID09PSAwKSB7XG4gICAgICAvLyBsZWZ0XG4gICAgICBjb25zdCBjaGVja0NpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgY2hlY2tDaXJjbGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgICAgY2hlY2tDaXJjbGUuY2xhc3NMaXN0LmFkZCgnaXRlbS1jaGVjaycpO1xuICAgICAgY2hlY2tDaXJjbGUuZGF0YXNldC50YXNrSWQgPSB0YXNrLmlkO1xuICAgICAgY2hlY2tDaXJjbGUuZGF0YXNldC5wcmlvcml0eSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICBjaGVja0NpcmNsZS5kYXRhc2V0LmNvbXBsZXRlZCA9IHRhc2suY29tcGxldGVkO1xuICAgICAgY2hlY2tDaXJjbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgICBjb21wbGV0ZVRhc2soY2hlY2tDaXJjbGUuZGF0YXNldC50YXNrSWQpXG4gICAgICApO1xuICAgICAgZWxlbWVudHNbaV0uaW5zZXJ0QmVmb3JlKGNoZWNrQ2lyY2xlLCBlbGVtZW50c1tpXS5maXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJpZ2h0XG4gICAgICBjb25zdCByaWdodFNpZGVCdG5zID0gWydpdGVtLWVkaXQnLCAnaXRlbS1yZW1vdmUnXTtcbiAgICAgIGNvbnN0IGl0ZW1CdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBpdGVtQnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdpdGVtLWJ1dHRvbnMnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmlnaHRTaWRlQnRucy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQocmlnaHRTaWRlQnRuc1tqXSk7XG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LnRhc2tJZCA9IHRhc2suaWQ7XG4gICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgICAgICAgIHNob3dFZGl0KGJ1dHRvbi5kYXRhc2V0LnRhc2tJZClcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICAgICAgICByZW1vdmVUYXNrKGJ1dHRvbi5kYXRhc2V0LnRhc2tJZClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW1CdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICB9XG4gICAgICBlbGVtZW50c1tpXS5hcHBlbmQoaXRlbUJ1dHRvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50cztcbn07XG5cbmNvbnN0IGNyZWF0ZVRhc2tJdGVtID0gKHRhc2spID0+IHtcbiAgY29uc3QgdGFza0lkID0gdGFzay5pZDtcbiAgY29uc3QgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1pdGVtJyk7XG4gIHRhc2tJdGVtLmRhdGFzZXQudGFza0lkID0gdGFza0lkO1xuXG4gIGNvbnN0IHNlY3Rpb25zID0gWydsZWZ0JywgJ3JpZ2h0J107XG4gIGxldCBlbGVtZW50cyA9IFtdO1xuICBzZWN0aW9ucy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoc2VjdGlvbik7XG4gICAgZWxlbWVudHMucHVzaChkaXYpO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRldGFpbHMuY2xhc3NMaXN0LmFkZCgnZGV0YWlscycpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgY29uc3QgcGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG4gICAgICBwYXJhLnRleHRDb250ZW50ID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gdGFzay5kYXRlID8gZm9ybWF0KHRhc2suZGF0ZSwgJ2QgTU1NIHl5eXknKSA6ICcnO1xuICAgICAgcGFyYS50ZXh0Q29udGVudCA9XG4gICAgICAgIHRhc2sucHJvamVjdElkID09PSAzXG4gICAgICAgICAgPyAnJ1xuICAgICAgICAgIDogcHJvamVjdE1hc3Rlci5maW5kUHJvamVjdCh0YXNrLnByb2plY3RJZCkubmFtZTtcbiAgICB9XG4gICAgZGV0YWlscy5hcHBlbmQoaGVhZGVyLCBwYXJhKTtcbiAgICBlbGVtZW50c1tpXS5hcHBlbmQoZGV0YWlscyk7XG4gIH1cblxuICBlbGVtZW50cyA9IGdlbmVyYXRlVGFza0V2ZW50cyhlbGVtZW50cywgdGFzayk7XG4gIHRhc2tJdGVtLmFwcGVuZCguLi5lbGVtZW50cyk7XG5cbiAgcmV0dXJuIHRhc2tJdGVtO1xufTtcblxuY29uc3Qgc2V0QWN0aXZlID0gKGlkKSA9PiB7XG4gIGNvbnN0IGlkTnVtID0gTnVtYmVyKGlkKTtcbiAgY29uc3QgaG9tZUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWUtaXRlbScpO1xuICBjb25zdCBwcm9qZWN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1pdGVtJyk7XG5cbiAgaWYgKGlkIDwgNCkge1xuICAgIFsuLi5wcm9qZWN0SXRlbXNdLmZvckVhY2goKHBJKSA9PlxuICAgICAgcEkucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzZXQtYWN0aXZlJylcbiAgICApO1xuICAgIFsuLi5ob21lSXRlbXNdLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGlmIChOdW1iZXIoaS5kYXRhc2V0LnNvcnRJZCkgPT09IGlkTnVtKSB7XG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnc2V0LWFjdGl2ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaS5jbGFzc0xpc3QucmVtb3ZlKCdzZXQtYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgWy4uLmhvbWVJdGVtc10uZm9yRWFjaCgoaSkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdzZXQtYWN0aXZlJykpO1xuICAgIFsuLi5wcm9qZWN0SXRlbXNdLmZvckVhY2goKHBJKSA9PiB7XG4gICAgICBpZiAoTnVtYmVyKHBJLmRhdGFzZXQucHJvamVjdElkKSA9PT0gaWROdW0pIHtcbiAgICAgICAgcEkucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXQtYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwSS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NldC1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVFbXB0eVNwbGFzaCA9ICgpID0+IHtcbiAgY29uc3QgcGVuZGluZ1Rhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BlbmRpbmctdGFzay1saXN0Jyk7XG4gIGNvbnN0IGVtcHR5U3BsYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHRleHQgPSBbXG4gICAgJ0FsbCBnb29kIScsXG4gICAgJ0FsbCBkb25lIScsXG4gICAgXCJXaGF0J3MgdGhlIHBsYW4/XCIsXG4gICAgXCJMZXQncyBnZXQgc3RhcnRlZCFcIixcbiAgICAnV2hldywgbm8gdGFza3MhJyxcbiAgICAnR29vZCB0byBnbyEnLFxuICBdO1xuICBjb25zdCBpbGx1cyA9IFsnaWxsdXMtMCcsICdpbGx1cy0xJywgJ2lsbHVzLTInLCAnaWxsdXMtMycsICdpbGx1cy00J107XG4gIGVtcHR5U3BsYXNoLmNsYXNzTGlzdC5hZGQoJ2VtcHR5LXNwbGFzaCcpO1xuICBlbXB0eVNwbGFzaC5zZXRBdHRyaWJ1dGUoXG4gICAgJ2lkJyxcbiAgICBpbGx1c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpbGx1cy5sZW5ndGgpXVxuICApO1xuICBlbXB0eVNwbGFzaC50ZXh0Q29udGVudCA9IHRleHRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGV4dC5sZW5ndGgpXTtcbiAgcGVuZGluZ1Rhc2tMaXN0LmFwcGVuZChlbXB0eVNwbGFzaCk7XG59O1xuXG5jb25zdCBjbGVhclRhc2tMaXN0ID0gKCkgPT4ge1xuICBjb25zdCBwZW5kaW5nVGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVuZGluZy10YXNrLWxpc3QnKTtcbiAgY29uc3QgY29tcGxldGVkVGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcGxldGVkLXRhc2stbGlzdCcpO1xuICB3aGlsZSAocGVuZGluZ1Rhc2tMaXN0LmNoaWxkRWxlbWVudENvdW50ID4gMCkge1xuICAgIHBlbmRpbmdUYXNrTGlzdC5yZW1vdmVDaGlsZChwZW5kaW5nVGFza0xpc3QuZmlyc3RFbGVtZW50Q2hpbGQpO1xuICB9XG4gIHdoaWxlIChjb21wbGV0ZWRUYXNrTGlzdC5jaGlsZEVsZW1lbnRDb3VudCA+IDApIHtcbiAgICBjb21wbGV0ZWRUYXNrTGlzdC5yZW1vdmVDaGlsZChjb21wbGV0ZWRUYXNrTGlzdC5maXJzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbn07XG5cbmNvbnN0IHJlbmRlclRhc2tMaXN0ID0gKGxpc3ROYW1lLCBsaXN0SWQsIHRhc2tMaXN0KSA9PiB7XG4gIGNvbnN0IGxpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0LXRpdGxlJyk7XG4gIGNvbnN0IG1haW5EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tZGlzcGxheScpO1xuICBjb25zdCBwZW5kaW5nVGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVuZGluZy10YXNrLWxpc3QnKTtcbiAgY29uc3QgY29tcGxldGVkVGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcGxldGVkLXRhc2stbGlzdCcpO1xuXG4gIGxpc3RUaXRsZS50ZXh0Q29udGVudCA9IGxpc3ROYW1lO1xuICBtYWluRGlzcGxheS5kYXRhc2V0Lmxpc3RJZCA9IGxpc3RJZDtcblxuICBjbGVhclRhc2tMaXN0KCk7XG5cbiAgaWYgKHRhc2tMaXN0LmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGVkKS5sZW5ndGggPCAxKSB7XG4gICAgZ2VuZXJhdGVFbXB0eVNwbGFzaCgpO1xuICB9XG4gIHRhc2tMaXN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICBjb25zdCBsaXN0SXRlbSA9IGNyZWF0ZVRhc2tJdGVtKHRhc2spO1xuICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgY29tcGxldGVkVGFza0xpc3QuaW5zZXJ0QmVmb3JlKFxuICAgICAgICBsaXN0SXRlbSxcbiAgICAgICAgY29tcGxldGVkVGFza0xpc3QuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlbmRpbmdUYXNrTGlzdC5pbnNlcnRCZWZvcmUobGlzdEl0ZW0sIHBlbmRpbmdUYXNrTGlzdC5maXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgfVxuICB9KTtcbiAgdXBkYXRlU2VsZWN0VmFsdWVzKCk7XG4gIHN0b3JlVGFza0xpc3QoKTtcbiAgc3RvcmVQcm9qZWN0TGlzdCgpO1xufTtcblxuY29uc3QgZmluZExpc3QgPSAobGlzdElkKSA9PiB7XG4gIGNvbnN0IGlkTnVtID0gTnVtYmVyKGxpc3RJZCk7XG4gIGxldCB0YXNrTGlzdCA9IHRhc2tNYXN0ZXIucmVhZCgpO1xuICBpZiAoaWROdW0gPCAzKSB7XG4gICAgc3dpdGNoIChpZE51bSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0YXNrTGlzdCA9IHRhc2tMaXN0LmZpbHRlcigodGFzaykgPT4gaXNUb2RheSh0YXNrLmRhdGUpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRhc2tMaXN0ID0gdGFza0xpc3QuZmlsdGVyKCh0YXNrKSA9PiBpc1dpdGhpbldlZWsodGFzaykpO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIE5vIGRlZmF1bHRcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGFza0xpc3QgPSBwcm9qZWN0TWFzdGVyLmZpbmRQcm9qZWN0KGlkTnVtKS50YXNrTGlzdCgpO1xuICB9XG4gIHJldHVybiB0YXNrTGlzdDtcbn07XG5cbmNvbnN0IG9wZW5MaXN0ID0gKGlkKSA9PiB7XG4gIGNvbnN0IGlkTnVtID0gTnVtYmVyKGlkKTtcbiAgY29uc3QgdGFza0xpc3QgPSBmaW5kTGlzdChpZCk7XG4gIGxldCBsaXN0TmFtZTtcbiAgaWYgKGlkTnVtIDwgMykge1xuICAgIHN3aXRjaCAoaWROdW0pIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbGlzdE5hbWUgPSAnQWxsJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGxpc3ROYW1lID0gJ1RvZGF5JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGxpc3ROYW1lID0gJ05leHQgNyBEYXlzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBObyBkZWZhdWx0XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxpc3ROYW1lID0gcHJvamVjdE1hc3Rlci5maW5kUHJvamVjdChpZCkubmFtZTtcbiAgfVxuICBzZXRBY3RpdmUoaWQpO1xuICByZW5kZXJUYXNrTGlzdChsaXN0TmFtZSwgaWQsIHRhc2tMaXN0KTtcbn07XG5cbmNvbnN0IHJlbG9hZExpc3QgPSAoXG4gIGlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tZGlzcGxheScpLmRhdGFzZXQubGlzdElkXG4pID0+IHtcbiAgb3Blbkxpc3QoaWQpO1xufTtcblxuY29uc3QgZ2VuZXJhdGVQcm9qZWN0RXZlbnRzID0gKHByb2plY3QsIHByb2plY3RJdGVtKSA9PiB7XG4gIGNvbnN0IHByb2plY3RMZWZ0ID0gcHJvamVjdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGVmdCcpO1xuICBwcm9qZWN0TGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG9wZW5MaXN0KHByb2plY3QuaWQpKTtcblxuICBjb25zdCBwcm9qZWN0UmVtb3ZlID0gcHJvamVjdEl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2plY3QtcmVtb3ZlJyk7XG4gIHByb2plY3RSZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiByZW1vdmVQcm9qZWN0KHByb2plY3RJdGVtKSk7XG5cbiAgY29uc3QgcHJvamVjdEVkaXQgPSBwcm9qZWN0SXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1lZGl0Jyk7XG4gIHByb2plY3RFZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICBzaG93UmVuYW1lKHByb2plY3QuaWQsIHByb2plY3RJdGVtKVxuICApO1xuXG4gIHJldHVybiBwcm9qZWN0SXRlbTtcbn07XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RJdGVtID0gKHByb2plY3QpID0+IHtcbiAgY29uc3QgcHJvamVjdElkID0gcHJvamVjdC5pZDtcbiAgY29uc3QgZGlzcGxheVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGlzcGxheVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS13cmFwcGVyJyk7XG4gIGxldCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcm9qZWN0SXRlbS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWl0ZW0nKTtcbiAgcHJvamVjdEl0ZW0uZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XG5cbiAgY29uc3QgcHJvamVjdExlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvamVjdExlZnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1sZWZ0Jyk7XG4gIGNvbnN0IG5hdkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbmF2SWNvbi5jbGFzc0xpc3QuYWRkKCduYXYtaWNvbicsICdwcm9qZWN0LWljb24nKTtcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICBwcm9qZWN0TGVmdC5hcHBlbmQobmF2SWNvbiwgcHJvamVjdE5hbWUpO1xuXG4gIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb2plY3RCdXR0b25zLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtYnV0dG9ucycpO1xuICBjb25zdCBidXR0b25zID0gWydwcm9qZWN0LWVkaXQnLCAncHJvamVjdC1yZW1vdmUnXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoYnV0dG9uc1tpXSk7XG4gICAgYnV0dG9uLmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdElkO1xuICAgIHByb2plY3RCdXR0b25zLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH1cblxuICBwcm9qZWN0SXRlbS5hcHBlbmQocHJvamVjdExlZnQsIHByb2plY3RCdXR0b25zKTtcbiAgcHJvamVjdEl0ZW0gPSBnZW5lcmF0ZVByb2plY3RFdmVudHMocHJvamVjdCwgcHJvamVjdEl0ZW0pO1xuICBkaXNwbGF5V3JhcHBlci5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG5cbiAgcmV0dXJuIGRpc3BsYXlXcmFwcGVyO1xufTtcblxuY29uc3QgYWRkUHJvamVjdFRvTGlzdCA9IChwcm9qZWN0KSA9PiB7XG4gIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICBjb25zdCBwcm9qZWN0SXRlbSA9IGNyZWF0ZVByb2plY3RJdGVtKHByb2plY3QpO1xuICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG4gIHVwZGF0ZVNlbGVjdE9wdGlvbnMoKTtcbiAgdXBkYXRlU2VsZWN0VmFsdWVzKCk7XG4gIHN0b3JlVGFza0xpc3QoKTtcbiAgc3RvcmVQcm9qZWN0TGlzdCgpO1xufTtcblxuY29uc3QgdXBkYXRlUHJvamVjdExpc3QgPSAoaWQpID0+IHtcbiAgY29uc3QgcmVuYW1lUHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVuYW1lLXByb2plY3QtZm9ybScpO1xuICBjb25zdCB7IHJlbmFtZUlkIH0gPSByZW5hbWVQcm9qZWN0Rm9ybS5kYXRhc2V0O1xuICBpZiAocmVuYW1lSWQgIT09ICdudWxsJyAmJiBOdW1iZXIocmVuYW1lSWQpID4gaWQpIHtcbiAgICByZW5hbWVQcm9qZWN0Rm9ybS5kYXRhc2V0LnJlbmFtZUlkIC09IDE7XG4gIH1cbiAgY29uc3QgcHJvamVjdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJvamVjdC1pZF0nKTtcbiAgWy4uLnByb2plY3RFbGVtZW50c10uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChOdW1iZXIoZWxlbWVudC5kYXRhc2V0LnByb2plY3RJZCkgPiBpZCkge1xuICAgICAgZWxlbWVudC5kYXRhc2V0LnByb2plY3RJZCAtPSAxO1xuICAgIH1cbiAgfSk7XG4gIHVwZGF0ZVNlbGVjdE9wdGlvbnMoKTtcbiAgdXBkYXRlU2VsZWN0VmFsdWVzKCk7XG4gIHN0b3JlVGFza0xpc3QoKTtcbiAgc3RvcmVQcm9qZWN0TGlzdCgpO1xufTtcblxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0SXRlbSkge1xuICBjb25zdCBwcm9qZWN0SWQgPSBOdW1iZXIocHJvamVjdEl0ZW0uZGF0YXNldC5wcm9qZWN0SWQpO1xuICBsZXQgbGlzdElkID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWRpc3BsYXknKS5kYXRhc2V0Lmxpc3RJZCk7XG4gIC8vIEFsc28gcmVtb3ZlcyB0YXNrcyB0aGF0IGJlbG9uZyB0byBwcm9qZWN0IHRvIGJlIHJlbW92ZWRcbiAgY29uc3QgZXhpc3RpbmdUYXNrcyA9IHByb2plY3RNYXN0ZXIuZmluZFByb2plY3QocHJvamVjdElkKS50YXNrTGlzdCgpO1xuICBleGlzdGluZ1Rhc2tzLmZvckVhY2goKHRhc2spID0+IHRhc2tNYXN0ZXIucmVtb3ZlKHRhc2suaWQpKTtcbiAgcHJvamVjdE1hc3Rlci5yZW1vdmUocHJvamVjdElkKTtcbiAgcHJvamVjdEl0ZW0ucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcblxuICBpZiAobGlzdElkID4gcHJvamVjdElkKSB7XG4gICAgbGlzdElkIC09IDE7XG4gICAgb3Blbkxpc3QobGlzdElkKTtcbiAgfSBlbHNlIGlmIChsaXN0SWQgPT09IHByb2plY3RJZCkge1xuICAgIC8vIE9wZW5zIGluYm94XG4gICAgb3Blbkxpc3QoMyk7XG4gIH0gZWxzZSB7XG4gICAgcmVsb2FkTGlzdCgpO1xuICB9XG4gIHVwZGF0ZVByb2plY3RMaXN0KHByb2plY3RJZCk7XG4gIC8vIGhpZGVNZW51KCdlZGl0LXRhc2stbWVudScpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVUYXNrKGlkKSB7XG4gIHRhc2tNYXN0ZXIucmVtb3ZlKGlkKTtcbiAgcmVsb2FkTGlzdCgpO1xufVxuXG5mdW5jdGlvbiBjbGVhckNvbXBsZXRlZFRhc2tzKCkge1xuICBjb25zdCBjdXJyZW50TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWRpc3BsYXknKS5kYXRhc2V0Lmxpc3RJZDtcbiAgY29uc3QgdGFza0xpc3QgPSBmaW5kTGlzdChjdXJyZW50TGlzdCk7XG4gIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gdGFza0xpc3QuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmNvbXBsZXRlZCA9PT0gdHJ1ZSk7XG4gIGNvbXBsZXRlZFRhc2tzLmZvckVhY2goKHRhc2spID0+IHJlbW92ZVRhc2sodGFzay5pZCkpO1xufVxuXG5mdW5jdGlvbiBjb21wbGV0ZVRhc2soaWQpIHtcbiAgY29uc3QgdGhpc1Rhc2sgPSB0YXNrTWFzdGVyLmZpbmRUYXNrKGlkKTtcbiAgdGhpc1Rhc2sudG9nZ2xlU3RhdHVzKCk7XG4gIHJlbG9hZExpc3QoKTtcbn1cblxuZnVuY3Rpb24gaXNXaXRoaW5XZWVrKHRhc2spIHtcbiAgcmV0dXJuIGlzV2l0aGluSW50ZXJ2YWwodGFzay5kYXRlLCB7XG4gICAgc3RhcnQ6IHN0YXJ0T2ZUb2RheSgpLFxuICAgIGVuZDogYWRkRGF5cyhzdGFydE9mVG9kYXkoKSwgOCksXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplQnV0dG9uRXZlbnRzKCkge1xuICBjb25zdCBob21lTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZS1pdGVtJyk7XG4gIGhvbWVMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG9wZW5MaXN0KGxpbmsuZGF0YXNldC5zb3J0SWQpKTtcbiAgfSk7XG4gIGNvbnN0IHJlbW92ZUNvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZW1vdmUtY29tcGxldGVkJyk7XG4gIHJlbW92ZUNvbXBsZXRlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyQ29tcGxldGVkVGFza3MpO1xufVxuXG5mdW5jdGlvbiByZXRyaWV2ZVN0b3JhZ2UoKSB7XG4gIGluaXRpYWxpemVUYXNrcygpO1xuICBpbml0aWFsaXplUHJvamVjdHMoKTtcbiAgY29uc3Qgc3RvcmVkUHJvamVjdExpc3QgPSBfLmRyb3AocHJvamVjdE1hc3Rlci5yZWFkKCksIDEpO1xuICBzdG9yZWRQcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiBhZGRQcm9qZWN0VG9MaXN0KHByb2plY3QpKTtcbn1cblxuZnVuY3Rpb24gYmFja2Ryb3BIaWRlU2VsZigpIHtcbiAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmFja2Ryb3AnKTtcblxuICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBhY3RpdmVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjdGl2ZS1tb2RhbD1cInRydWVcIl0nKTtcbiAgICBoaWRlTW9kYWwoYWN0aXZlTW9kYWwuaWQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVVJKCkge1xuICBiYWNrZHJvcEhpZGVTZWxmKCk7XG4gIHJldHJpZXZlU3RvcmFnZSgpO1xuICBpbml0aWFsaXplRm9ybUNvbnRyb2xsZXIoKTtcbiAgaW5pdGlhbGl6ZUJ1dHRvbkV2ZW50cygpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IG9wZW5MaXN0KDMpKTtcbn1cblxuZXhwb3J0IHsgaW5pdGlhbGl6ZVVJLCByZWxvYWRMaXN0LCBhZGRQcm9qZWN0VG9MaXN0IH07XG4iLCJpbXBvcnQgeyBmb3JtYXQsIHN0YXJ0T2ZUb2RheSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IHRhc2tNYXN0ZXIgfSBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCB7IHByb2plY3RNYXN0ZXIgfSBmcm9tICcuL3Byb2plY3RzJztcblxuLy8gY29uc3QgaW5zZXJ0VG9wID0gKG1lbnUpID0+IHtcbi8vICAgY29uc3QgbWVudXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lbnVzJyk7XG4vLyAgIG1lbnVzU2VjdGlvbi5pbnNlcnRCZWZvcmUobWVudSwgbWVudXNTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkKTtcbi8vIH07XG5cbmNvbnN0IHRvZ2dsZUJhY2tkcm9wID0gKCkgPT4ge1xuICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZHJvcCcpO1xuICBiYWNrZHJvcC5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJyk7XG59O1xuXG5jb25zdCB1cGRhdGVTZWxlY3RPcHRpb25zID0gKCkgPT4ge1xuICAvLyBjb25zdCBtZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51cycpO1xuICBjb25zdCBtZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWRpc3BsYXknKTtcbiAgY29uc3QgZm9ybXMgPSBtZW51cy5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyk7XG4gIGZvcm1zLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICB3aGlsZSAocHJvamVjdFNlbGVjdC5jaGlsZEVsZW1lbnRDb3VudCA+IDApIHtcbiAgICAgIHByb2plY3RTZWxlY3QucmVtb3ZlQ2hpbGQocHJvamVjdFNlbGVjdC5maXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBwcm9qZWN0TWFzdGVyLnJlYWQoKTtcbiAgICBwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IHByb2plY3QuaWQ7XG4gICAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlU2VsZWN0VmFsdWVzID0gKCkgPT4ge1xuICBjb25zdCBsaXN0SWQgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tZGlzcGxheScpLmRhdGFzZXQubGlzdElkKTtcbiAgY29uc3QgYWRkVGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stZm9ybScpO1xuICBjb25zdCBwcm9qZWN0U2VsZWN0QWRkID0gYWRkVGFza0Zvcm0ucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gIHByb2plY3RTZWxlY3RBZGQudmFsdWUgPSBsaXN0SWQgPiAzID8gbGlzdElkIDogMztcbn07XG5cbmNvbnN0IHZhbGlkYXRlTmFtZUlucHV0ID0gKGZvcm0pID0+IHtcbiAgY29uc3QgbmFtZUZpZWxkID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICBjb25zdCBzdWJtaXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQnKTtcbiAgaWYgKG5hbWVGaWVsZC52YWxpZGl0eS52YWxpZCkge1xuICAgIHN1Ym1pdC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH0gZWxzZSB7XG4gICAgc3VibWl0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnICcpO1xuICB9XG59O1xuXG5jb25zdCBzaG93QWRkID0gKCkgPT4ge1xuICBjb25zdCBjdXJyZW50TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWRpc3BsYXknKS5kYXRhc2V0Lmxpc3RJZDtcbiAgY29uc3QgYWRkVGFza01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stbWVudScpO1xuICBjb25zdCBhZGRUYXNrRm9ybSA9IGFkZFRhc2tNZW51LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgY29uc3QgZGF0ZUlucHV0ID0gYWRkVGFza0Zvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImRhdGVcIl0nKTtcbiAgYWRkVGFza0Zvcm0ucmVzZXQoKTtcbiAgYWRkVGFza01lbnUuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScpO1xuICBhZGRUYXNrTWVudS5kYXRhc2V0LmFjdGl2ZU1vZGFsID0gdHJ1ZTtcblxuICBpZiAoTnVtYmVyKGN1cnJlbnRMaXN0KSA9PT0gMSkge1xuICAgIGRhdGVJbnB1dC52YWx1ZSA9IGZvcm1hdChzdGFydE9mVG9kYXkoKSwgJ3l5eXktTU0tZGQnKTtcbiAgfVxuXG4gIHRvZ2dsZUJhY2tkcm9wKCk7XG4gIHVwZGF0ZVNlbGVjdFZhbHVlcygpO1xuICB2YWxpZGF0ZU5hbWVJbnB1dChhZGRUYXNrRm9ybSk7XG59O1xuXG5jb25zdCBnZXRUYXNrSW5mbyA9IChpZCkgPT4ge1xuICBjb25zdCBlZGl0VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWZvcm0nKTtcbiAgY29uc3QgZWRpdE5hbWUgPSBlZGl0VGFza0Zvcm0ucXVlcnlTZWxlY3RvcignI3Rhc2stbmFtZS1lZGl0Jyk7XG4gIGNvbnN0IGVkaXREZXNjcmlwdGlvbiA9IGVkaXRUYXNrRm9ybS5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXNjcmlwdGlvbi1lZGl0Jyk7XG4gIGNvbnN0IGVkaXREYXRlID0gZWRpdFRhc2tGb3JtLnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRhdGUtZWRpdCcpO1xuICBjb25zdCBlZGl0UHJvamVjdCA9IGVkaXRUYXNrRm9ybS5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1lZGl0Jyk7XG4gIGNvbnN0IGVkaXRQcmlvcml0eSA9IGVkaXRUYXNrRm9ybS5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICdpbnB1dFtuYW1lPXByaW9yaXR5LWVkaXRdJ1xuICApO1xuXG4gIGNvbnN0IHRoaXNUYXNrID0gdGFza01hc3Rlci5maW5kVGFzayhpZCk7XG4gIGVkaXROYW1lLnZhbHVlID0gdGhpc1Rhc2submFtZTtcbiAgZWRpdERlc2NyaXB0aW9uLnZhbHVlID0gdGhpc1Rhc2suZGVzY3JpcHRpb247XG4gIGVkaXREYXRlLnZhbHVlID0gIXRoaXNUYXNrLmRhdGUgPyAnJyA6IGZvcm1hdCh0aGlzVGFzay5kYXRlLCAneXl5eS1NTS1kZCcpO1xuICBlZGl0UHJvamVjdC52YWx1ZSA9IHRoaXNUYXNrLnByb2plY3RJZDtcbiAgZWRpdFByaW9yaXR5LmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgaWYgKGlucHV0LnZhbHVlID09PSB0aGlzVGFzay5wcmlvcml0eSkge1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3Qgc2hvd0VkaXQgPSAoaWQpID0+IHtcbiAgY29uc3Qgc2hvd0VkaXRNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1tZW51Jyk7XG4gIGNvbnN0IGVkaXRUYXNrRm9ybSA9IHNob3dFZGl0TWVudS5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5cbiAgc2hvd0VkaXRNZW51LmNsYXNzTGlzdC50b2dnbGUoJ3Zpc2libGUnKTtcbiAgc2hvd0VkaXRNZW51LmRhdGFzZXQuYWN0aXZlTW9kYWwgPSB0cnVlO1xuXG4gIGVkaXRUYXNrRm9ybS5kYXRhc2V0LnRhc2tJZCA9IGlkO1xuICB0b2dnbGVCYWNrZHJvcCgpO1xuICBnZXRUYXNrSW5mbyhpZCk7XG4gIHZhbGlkYXRlTmFtZUlucHV0KGVkaXRUYXNrRm9ybSk7XG59O1xuXG5jb25zdCBzaG93QWRkUHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3Qgc2hvd0FkZFByb2plY3RNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LW1lbnUnKTtcbiAgY29uc3QgYWRkUHJvamVjdEZvcm0gPSBzaG93QWRkUHJvamVjdE1lbnUucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICBzaG93QWRkUHJvamVjdE1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1ub25lJyk7XG4gIHZhbGlkYXRlTmFtZUlucHV0KGFkZFByb2plY3RGb3JtKTtcbn07XG5cbmNvbnN0IHNob3dSZW5hbWUgPSAoaWQsIHByb2plY3RJdGVtKSA9PiB7XG4gIGNvbnN0IHJlbmFtZVByb2plY3RNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlbmFtZS1wcm9qZWN0LW1lbnUnKTtcbiAgY29uc3QgcmVuYW1lUHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVuYW1lLXByb2plY3QtZm9ybScpO1xuICBjb25zdCBuYW1lSW5wdXQgPSByZW5hbWVQcm9qZWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgY29uc3QgdGhpc0l0ZW0gPSBwcm9qZWN0SXRlbS5wYXJlbnRFbGVtZW50O1xuXG4gIGlmIChyZW5hbWVQcm9qZWN0Rm9ybS5kYXRhc2V0LnByb2plY3RJZCAhPT0gJ251bGwnKSB7XG4gICAgaGlkZU1lbnUoJ3JlbmFtZS1wcm9qZWN0LW1lbnUnKTtcbiAgfVxuXG4gIHJlbmFtZVByb2plY3RGb3JtLmRhdGFzZXQucmVuYW1lSWQgPSBpZDtcbiAgbmFtZUlucHV0LnZhbHVlID0gcHJvamVjdE1hc3Rlci5maW5kUHJvamVjdChpZCkubmFtZTtcbiAgcHJvamVjdExpc3QuaW5zZXJ0QmVmb3JlKHJlbmFtZVByb2plY3RNZW51LCB0aGlzSXRlbSk7XG4gIHRoaXNJdGVtLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktbm9uZScpO1xuICByZW5hbWVQcm9qZWN0TWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LW5vbmUnKTtcbiAgdmFsaWRhdGVOYW1lSW5wdXQocmVuYW1lUHJvamVjdEZvcm0pO1xufTtcblxuY29uc3QgaGlkZVJlbmFtZSA9IChtZW51KSA9PiB7XG4gIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICBjb25zdCByZW5hbWVNZW51ID0gbWVudTtcbiAgY29uc3QgcmVuYW1lRm9ybSA9IG1lbnUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIHJlbmFtZUZvcm0uZGF0YXNldC5yZW5hbWVJZCA9IG51bGw7XG4gIHJlbmFtZU1lbnUubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktbm9uZScpO1xuICBwcm9qZWN0TGlzdC5pbnNlcnRCZWZvcmUocmVuYW1lTWVudSwgcHJvamVjdExpc3QuZmlyc3RFbGVtZW50Q2hpbGQpO1xufTtcblxuLy8gY29uc3Qgc3F1YXNoRWRpdCA9IChpZCkgPT4ge1xuLy8gICBjb25zdCBlZGl0VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWZvcm0nKTtcblxuLy8gICBpZiAoIVtpZCwgZWRpdFRhc2tGb3JtLmRhdGFzZXQudGFza0lkXS5pbmNsdWRlcygnbnVsbCcpKSB7XG4vLyAgICAgY29uc3QgaWROdW0gPSBOdW1iZXIoaWQpO1xuLy8gICAgIGNvbnN0IGVsZW1lbnRJZCA9IE51bWJlcihlZGl0VGFza0Zvcm0uZGF0YXNldC50YXNrSWQpO1xuXG4vLyAgICAgaWYgKGlkTnVtID09PSBlbGVtZW50SWQpIHtcbi8vICAgICAgIGhpZGVNZW51KGVkaXRUYXNrRm9ybS5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKSk7XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9O1xuXG5jb25zdCBzZXRNaW5EYXRlID0gKCkgPT4ge1xuICBjb25zdCBkYXRlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1kYXRlXScpO1xuICBjb25zdCB0b2RheSA9IGZvcm1hdChuZXcgRGF0ZSgpLCAneXl5eS1NTS1kZCcpO1xuICBkYXRlSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiBpbnB1dC5zZXRBdHRyaWJ1dGUoJ21pbicsIHRvZGF5KSk7XG59O1xuXG5mdW5jdGlvbiBoaWRlTW9kYWwoYnRuKSB7XG4gIGxldCBtb2RhbDtcbiAgc3dpdGNoIChidG4pIHtcbiAgICBjYXNlICdhZGQtdGFzay1tZW51JzpcbiAgICAgIG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLW1lbnUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VkaXQtdGFzay1tZW51JzpcbiAgICAgIG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1tZW51Jyk7XG4gICAgICBtb2RhbC5maXJzdEVsZW1lbnRDaGlsZC5kYXRhc2V0LnRhc2tJZCA9IG51bGw7XG4gICAgICBicmVhaztcbiAgICAvLyBObyBkZWZhdWx0XG4gIH1cblxuICBtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJyk7XG4gIG1vZGFsLmRhdGFzZXQuYWN0aXZlTW9kYWwgPSBmYWxzZTtcblxuICBjb25zdCBmb3JtID0gbW9kYWwucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICBzZXRUaW1lb3V0KCgpID0+IGZvcm0ucmVzZXQoKSwgMzUwKTtcbiAgdG9nZ2xlQmFja2Ryb3AoKTtcbn1cblxuZnVuY3Rpb24gaGlkZU1lbnUoYnRuKSB7XG4gIGxldCBtZW51O1xuICBzd2l0Y2ggKGJ0bikge1xuICAgIC8vIGNhc2UgJ2FkZC10YXNrLW1lbnUnOlxuICAgIC8vICAgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1tZW51Jyk7XG4gICAgLy8gICBicmVhaztcbiAgICAvLyBjYXNlICdlZGl0LXRhc2stbWVudSc6XG4gICAgLy8gICBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1tZW51Jyk7XG4gICAgLy8gICBtZW51LmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQudGFza0lkID0gbnVsbDtcbiAgICAvLyAgIGJyZWFrO1xuICAgIGNhc2UgJ2FkZC1wcm9qZWN0LW1lbnUnOlxuICAgICAgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1tZW51Jyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZW5hbWUtcHJvamVjdC1tZW51JzpcbiAgICAgIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVuYW1lLXByb2plY3QtbWVudScpO1xuICAgICAgaGlkZVJlbmFtZShtZW51KTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIE5vIGRlZmF1bHRcbiAgfVxuXG4gIGNvbnN0IGZvcm0gPSBtZW51LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgZm9ybS5yZXNldCgpO1xuICBtZW51LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktbm9uZScpO1xufVxuXG5jb25zdCBpbml0aWFsaXplTW9kYWxIaWRlID0gKCkgPT4ge1xuICBjb25zdCBjYW5jZWxCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhbmNlbC1tb2RhbCcpO1xuICBjYW5jZWxCdG5zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBoaWRlTW9kYWwoZS50YXJnZXQuZGF0YXNldC5tZW51KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCBpbml0aWFsaXplQnV0dG9uRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBjYW5jZWxCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhbmNlbCcpO1xuICBjYW5jZWxCdG5zLmZvckVhY2goKGJ1dHRvbikgPT5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaGlkZU1lbnUoZS50YXJnZXQuZGF0YXNldC5tZW51KTtcbiAgICB9KVxuICApO1xufTtcblxuY29uc3QgaW5pdGlhbGl6ZUZvcm1zID0gKCkgPT4ge1xuICBjb25zdCBhbGxGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcbiAgYWxsRm9ybXMuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB2YWxpZGF0ZU5hbWVJbnB1dChmb3JtKSk7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgfSk7XG4gIHNldE1pbkRhdGUoKTtcbiAgdXBkYXRlU2VsZWN0T3B0aW9ucygpO1xufTtcblxuY29uc3QgaW5pdGlhbGl6ZUZvcm1Db250cm9sbGVyID0gKCkgPT4ge1xuICBpbml0aWFsaXplTW9kYWxIaWRlKCk7XG4gIGluaXRpYWxpemVCdXR0b25FdmVudHMoKTtcbiAgaW5pdGlhbGl6ZUZvcm1zKCk7XG59O1xuXG5leHBvcnQge1xuICBpbml0aWFsaXplRm9ybUNvbnRyb2xsZXIsXG4gIHNob3dBZGQsXG4gIHNob3dBZGRQcm9qZWN0LFxuICBzaG93RWRpdCxcbiAgaGlkZU1lbnUsXG4gIGhpZGVNb2RhbCxcbiAgdXBkYXRlU2VsZWN0T3B0aW9ucyxcbiAgdXBkYXRlU2VsZWN0VmFsdWVzLFxuICAvLyBzcXVhc2hFZGl0LFxuICBzaG93UmVuYW1lLFxufTtcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB0YXNrTWFzdGVyIH0gZnJvbSAnLi90YXNrcyc7XG5cbmNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihpZCwgbmFtZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgdGFza0xpc3QoKSB7XG4gICAgcmV0dXJuIHRhc2tNYXN0ZXIuZmluZFByb2plY3QodGhpcy5pZCk7XG4gIH1cbn1cblxuLy8gY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoaWQsIG5hbWUpID0+IHtcbi8vICAgY29uc3QgdGFza0xpc3QgPSAoKSA9PiB0YXNrTWFzdGVyLmZpbmRQcm9qZWN0KGlkKTtcbi8vICAgcmV0dXJuIHtcbi8vICAgICB0YXNrTGlzdCxcbi8vICAgICBnZXQgaWQoKSB7XG4vLyAgICAgICByZXR1cm4gaWQ7XG4vLyAgICAgfSxcbi8vICAgICBzZXQgaWQobmV3SWQpIHtcbi8vICAgICAgIGlkID0gbmV3SWQ7XG4vLyAgICAgfSxcbi8vICAgICBnZXQgbmFtZSgpIHtcbi8vICAgICAgIHJldHVybiBuYW1lO1xuLy8gICAgIH0sXG4vLyAgICAgc2V0IG5hbWUobmV3TmFtZSkge1xuLy8gICAgICAgbmFtZSA9IG5ld05hbWU7XG4vLyAgICAgfSxcbi8vICAgfTtcbi8vIH07XG5cbmNvbnN0IHByb2plY3RNYXN0ZXIgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xuICBjb25zdCBwdXNoID0gKHByb2plY3QpID0+IHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XG4gIGNvbnN0IHJlYWQgPSAoKSA9PiBwcm9qZWN0TGlzdDtcbiAgY29uc3QgZmluZFByb2plY3QgPSAoaWQpID0+IHtcbiAgICBjb25zdCBpZE51bSA9IE51bWJlcihpZCk7XG4gICAgcmV0dXJuIHByb2plY3RMaXN0LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IGlkTnVtKTtcbiAgfTtcbiAgY29uc3QgcmVtb3ZlID0gKGlkKSA9PiB7XG4gICAgY29uc3QgaWROdW0gPSBOdW1iZXIoaWQpO1xuICAgIF8ucmVtb3ZlKHByb2plY3RMaXN0LCBmaW5kUHJvamVjdChpZCkpO1xuICAgIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0LmlkID4gaWROdW0pIHtcbiAgICAgICAgcHJvamVjdC50YXNrTGlzdCgpLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICB0YXNrLnByb2plY3RJZCAtPSAxO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvamVjdC5pZCAtPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcHVzaCxcbiAgICByZWFkLFxuICAgIGZpbmRQcm9qZWN0LFxuICAgIHJlbW92ZSxcbiAgfTtcbn0pKCk7XG5cbmNvbnN0IHNhdmVUb0xvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RMaXN0JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdE1hc3Rlci5yZWFkKCkpKTtcbn07XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9qZWN0cygpIHtcbiAgaWYgKCdwcm9qZWN0TGlzdCcgaW4gbG9jYWxTdG9yYWdlKSB7XG4gICAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdExpc3QnKSk7XG4gICAgcHJvamVjdHMgPSBfLmRyb3AocHJvamVjdHMsIDEpO1xuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIHByb2plY3RNYXN0ZXIucHVzaChuZXcgUHJvamVjdCguLi5PYmplY3QudmFsdWVzKHByb2plY3QpKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgUHJvamVjdCxcbiAgcHJvamVjdE1hc3RlcixcbiAgc2F2ZVRvTG9jYWxTdG9yYWdlIGFzIHN0b3JlUHJvamVjdExpc3QsXG4gIGluaXRpYWxpemVQcm9qZWN0cyxcbn07XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgcGFyc2VKU09OIH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IoaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcm9qZWN0SWQsIHByaW9yaXR5LCBjb21wbGV0ZWQgPSBmYWxzZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgIHRoaXMucHJvamVjdElkID0gcHJvamVjdElkO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgfVxuXG4gIHRvZ2dsZVN0YXR1cygpIHtcbiAgICB0aGlzLmNvbXBsZXRlZCA9ICF0aGlzLmNvbXBsZXRlZFxuICB9XG59XG5cbi8vIGNvbnN0IHRhc2tGYWN0b3J5ID0gKFxuLy8gICBpZCxcbi8vICAgbmFtZSxcbi8vICAgZGVzY3JpcHRpb24sXG4vLyAgIGRhdGUsXG4vLyAgIHByb2plY3RJZCxcbi8vICAgcHJpb3JpdHksXG4vLyAgIGNvbXBsZXRlZCA9IGZhbHNlXG4vLyApID0+IHtcbi8vICAgcmV0dXJuIHtcbi8vICAgICBnZXQgaWQoKSB7XG4vLyAgICAgICByZXR1cm4gaWQ7XG4vLyAgICAgfSxcbi8vICAgICBzZXQgaWQobmV3SWQpIHtcbi8vICAgICAgIGlkID0gbmV3SWQ7XG4vLyAgICAgfSxcbi8vICAgICBnZXQgbmFtZSgpIHtcbi8vICAgICAgIHJldHVybiBuYW1lO1xuLy8gICAgIH0sXG4vLyAgICAgc2V0IG5hbWUobmV3TmFtZSkge1xuLy8gICAgICAgbmFtZSA9IG5ld05hbWU7XG4vLyAgICAgfSxcbi8vICAgICBnZXQgZGVzY3JpcHRpb24oKSB7XG4vLyAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4vLyAgICAgfSxcbi8vICAgICBzZXQgZGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pIHtcbi8vICAgICAgIGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4vLyAgICAgfSxcbi8vICAgICBnZXQgZGF0ZSgpIHtcbi8vICAgICAgIHJldHVybiBkYXRlO1xuLy8gICAgIH0sXG4vLyAgICAgc2V0IGRhdGUobmV3RGF0ZSkge1xuLy8gICAgICAgZGF0ZSA9IG5ld0RhdGU7XG4vLyAgICAgfSxcbi8vICAgICBnZXQgcHJvamVjdElkKCkge1xuLy8gICAgICAgcmV0dXJuIHByb2plY3RJZDtcbi8vICAgICB9LFxuLy8gICAgIHNldCBwcm9qZWN0SWQobmV3UHJvamVjdElkKSB7XG4vLyAgICAgICBwcm9qZWN0SWQgPSBuZXdQcm9qZWN0SWQ7XG4vLyAgICAgfSxcbi8vICAgICBnZXQgcHJpb3JpdHkoKSB7XG4vLyAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4vLyAgICAgfSxcbi8vICAgICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcbi8vICAgICAgIHByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4vLyAgICAgfSxcbi8vICAgICBnZXQgY29tcGxldGVkKCkge1xuLy8gICAgICAgcmV0dXJuIGNvbXBsZXRlZDtcbi8vICAgICB9LFxuLy8gICAgIHNldCBjb21wbGV0ZWQobmV3Q29tcGxldGVkKSB7XG4vLyAgICAgICBjb21wbGV0ZWQgPSBuZXdDb21wbGV0ZWQ7XG4vLyAgICAgfSxcbi8vICAgfTtcbi8vIH07XG5cbmNvbnN0IHRhc2tNYXN0ZXIgPSAoKCkgPT4ge1xuICBjb25zdCB0YXNrTGlzdCA9IFtdO1xuICBjb25zdCBwdXNoID0gKHRhc2spID0+IHRhc2tMaXN0LnB1c2godGFzayk7XG4gIGNvbnN0IHJlYWQgPSAoKSA9PiB0YXNrTGlzdDtcbiAgY29uc3QgZmluZFRhc2sgPSAoaWQpID0+IHtcbiAgICBjb25zdCBpZE51bSA9IE51bWJlcihpZCk7XG4gICAgY29uc3QgdGhpc1Rhc2sgPSB0YXNrTGlzdC5maW5kKCh0YXNrKSA9PiB0YXNrLmlkID09PSBpZE51bSk7XG4gICAgcmV0dXJuIHRoaXNUYXNrO1xuICB9O1xuICBjb25zdCBmaW5kUHJvamVjdCA9IChpZCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RJZE51bSA9IE51bWJlcihpZCk7XG4gICAgY29uc3QgdGFza3MgPSB0YXNrTGlzdC5maWx0ZXIoKHRhc2spID0+IHRhc2sucHJvamVjdElkID09PSBwcm9qZWN0SWROdW0pO1xuICAgIHJldHVybiB0YXNrcztcbiAgfTtcbiAgY29uc3QgcmVtb3ZlID0gKGlkKSA9PiB7XG4gICAgY29uc3QgaWROdW0gPSBOdW1iZXIoaWQpO1xuICAgIF8ucmVtb3ZlKHRhc2tMaXN0LCBmaW5kVGFzayhpZE51bSkpO1xuICAgIHRhc2tMaXN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGlmICh0YXNrLmlkID4gaWROdW0pIHtcbiAgICAgICAgdGFzay5pZCAtPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcHVzaCxcbiAgICByZWFkLFxuICAgIGZpbmRUYXNrLFxuICAgIGZpbmRQcm9qZWN0LFxuICAgIHJlbW92ZSxcbiAgfTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tMaXN0JywgSlNPTi5zdHJpbmdpZnkodGFza01hc3Rlci5yZWFkKCkpKTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVRhc2tzKCkge1xuICBpZiAoJ3Rhc2tMaXN0JyBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICBjb25zdCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tMaXN0JykpO1xuICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIHRhc2suZGF0ZSA9IHRhc2suZGF0ZSA/IHBhcnNlSlNPTih0YXNrLmRhdGUpIDogbnVsbDtcbiAgICAgIHRhc2tNYXN0ZXIucHVzaChuZXcgVGFzayguLi5PYmplY3QudmFsdWVzKHRhc2spKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgVGFzayxcbiAgdGFza01hc3RlcixcbiAgc2F2ZVRvTG9jYWxTdG9yYWdlIGFzIHN0b3JlVGFza0xpc3QsXG4gIGluaXRpYWxpemVUYXNrcyxcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=