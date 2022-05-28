import { format } from 'date-fns';
import { taskMaster } from './tasks';

const insertTop = (menu) => {
  const menusSection = document.querySelector('#menus');
  menusSection.insertBefore(menu, menusSection.firstElementChild);
};

const showAdd = () => {
  const addTaskMenu = document.querySelector('#add-task-menu');
  const addTaskForm = addTaskMenu.querySelector('form');
  addTaskForm.reset();
  addTaskMenu.classList.remove('display-none');
  insertTop(addTaskMenu);
};

const getTaskInfo = (id) => {
  const editTaskForm = document.querySelector('#edit-task-form');
  const editName = editTaskForm.querySelector('#task-name-edit');
  const editDescription = editTaskForm.querySelector('#task-description-edit');
  const editDate = editTaskForm.querySelector('#task-date-edit');

  const thisTask = taskMaster.findTask(id);
  editName.value = thisTask.name;
  editDescription.value = thisTask.description;
  editDate.value = (!thisTask.date) ? '' : format(thisTask.date, 'yyyy-MM-dd');
}

const showEdit = (id) => {
  const showEditMenu = document.querySelector('#edit-task-menu');
  const editTaskForm = showEditMenu.querySelector('form');
  editTaskForm.dataset.taskId = id;
  if (showEditMenu.classList.contains('display-none')) {
    showEditMenu.classList.remove('display-none');
  }
  getTaskInfo(id);
}

const hideMenu = (btn) => {
  let menu;
  switch (btn) {
    case 'add-task':
      menu = document.querySelector('#add-task-menu');
      break;
    case 'edit-task':
      menu = document.querySelector('#edit-task-menu');
      menu.dataset.taskId = null;
      break;
    // No default
  }

  const form = menu.querySelector('form');
  form.reset();
  menu.classList.add('display-none');
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

const setMinDate = () => {
  const dateInputs = document.querySelectorAll('input[type=date]');
  const today = format(new Date(), 'yyyy-MM-dd');
  dateInputs.forEach(input => input.setAttribute('min', today));
}

const initializeForms = () => {
  const allForms = document.querySelectorAll('form');
  allForms.forEach((form) =>
    form.addEventListener('input', () => validateNameInput(form))
  );
  setMinDate();
};

// const showEdit = () => {

// }

export { showAdd, hideMenu, initializeForms, showEdit };
