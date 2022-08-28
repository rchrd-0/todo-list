import { Project, projectMaster } from './projects';
import {
  hideMenu,
  showAddProject,
  // squashEdit,
  updateSelectOptions,
} from './form-controller';
import { reloadList, addProjectToList } from './display';

const findInList = (id) => {
  const projectItems = document.querySelectorAll('.project-item');
  const thisItem = [...projectItems].find(
    (item) => item.dataset.projectId === id
  );
  return thisItem;
};

const createProject = () => {
  const projectId = projectMaster.read().length + 3;
  const projectName = document.querySelector('#project-name-add').value;

  const newProject = new Project(projectId, projectName);
  projectMaster.push(newProject);
  hideMenu('add-project-menu');
  addProjectToList(newProject);
};

const renameProject = () => {
  const { renameId } = document.querySelector('#rename-project-form').dataset;
  const project = projectMaster.findProject(renameId);
  const newName = document.querySelector('#project-name-edit').value;
  const projectTitle = findInList(renameId).querySelector('span');
  project.name = newName;
  projectTitle.textContent = newName;
  // project.taskList().forEach((task) => squashEdit(task.id));
  updateSelectOptions();
  reloadList();

  hideMenu('rename-project-menu');
};

const initializeButtonEvents = () => {
  const showAddProjectBtn = document.querySelector('#show-add-project');
  const submitAddProject = document.querySelector('#submit-add-project');
  const submitRenameProject = document.querySelector('#submit-rename-project');
  showAddProjectBtn.addEventListener('click', showAddProject);
  submitAddProject.addEventListener('click', createProject);
  submitRenameProject.addEventListener('click', renameProject);
};

const initializeInbox = () => {
  const inbox = new Project(3, 'Inbox');
  projectMaster.push(inbox);
};

function initializeProjectHandler() {
  initializeButtonEvents();
  initializeInbox();
}

export { initializeProjectHandler };
