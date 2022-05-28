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

const hideMenu = (btn) => {
  let menu;
  switch (btn) {
    case 'add-task':
      menu = document.querySelector('#add-task-menu');
      break;
    // No default
  }

  const form = menu.querySelector('form');
  form.reset();
  menu.classList.add('display-none');
};

// const showEdit = () => {

// }

export { showAdd, hideMenu };
