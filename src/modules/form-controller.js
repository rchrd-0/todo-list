import { format, startOfToday } from 'date-fns';
import { taskMaster } from './tasks';
import { projectMaster } from './projects';

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

    const projectList = projectMaster.read();
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
    dateInput.value = format(startOfToday(), 'yyyy-MM-dd');
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

  const thisTask = taskMaster.findTask(id);
  editName.value = thisTask.name;
  editDescription.value = thisTask.description;
  editDate.value = !thisTask.date ? '' : format(thisTask.date, 'yyyy-MM-dd');
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
  nameInput.value = projectMaster.findProject(id).name;
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
  const today = format(new Date(), 'yyyy-MM-dd');
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

export {
  initializeFormController,
  showAdd,
  showAddProject,
  showEdit,
  hideMenu,
  hideModal,
  updateSelectOptions,
  updateSelectValues,
  // squashEdit,
  showRename,
};
