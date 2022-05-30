import { projectFactory, projectMaster } from './projects';
import { hideMenu, showAddProject, squashEdit } from './form-controller';
import { reloadList, addProjectToList } from './display';

function createProject() {
  const projectId = projectMaster.read().length + 3;
  const projectName = document.querySelector('#project-name-add').value;

  const newProject = projectFactory(projectId, projectName);
  projectMaster.push(newProject);
  hideMenu('add-project-menu');
  addProjectToList(newProject);
}

function renameProject() {
  const { renameId } = document.querySelector('#rename-project-form').dataset;
  const project = projectMaster.findProject(renameId);
  const newName = document.querySelector('#project-name-edit').value;
  const projectTitle = findInList(renameId).querySelector('span');
  project.name = newName;
  projectTitle.textContent = newName;
  project.taskList().forEach((task) => squashEdit(task.id));
  reloadList();
  hideMenu('rename-project-menu');
}

function findInList(id) {
  const projectItems = document.querySelectorAll('.project-item');
  const thisItem = [...projectItems].find(
    (item) => item.dataset.projectId === id
  );
  return thisItem;
}

function initializeButtonEvents() {
  const showAddProjectBtn = document.querySelector('#show-add-project');
  const submitAddProject = document.querySelector('#submit-add-project');
  const submitRenameProject = document.querySelector('#submit-rename-project');
  showAddProjectBtn.addEventListener('click', showAddProject);
  submitAddProject.addEventListener('click', createProject);
  submitRenameProject.addEventListener('click', renameProject);
}

function initializeInbox() {
  const inbox = projectFactory(3, 'Inbox');
  projectMaster.push(inbox);
}

function initializeProjectHandler() {
  initializeButtonEvents();
  initializeInbox();
}

export { initializeProjectHandler };
