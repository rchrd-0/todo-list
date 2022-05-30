import { projectFactory, projectMaster } from './projects';
import { hideMenu, showAddProject, squashEdit } from './form-controller';
import { renderProjectList, reloadList } from './display';

function createProject() {
  const projectId = projectMaster.read().length + 3;
  const projectName = document.querySelector('#project-name-add').value;

  const newProject = projectFactory(projectId, projectName);
  projectMaster.push(newProject);
  hideMenu('add-project-menu');
  renderProjectList();
}

function renameProject() {
  const { projectId } = document.querySelector('#rename-project-form').dataset;
  const project = projectMaster.findProject(projectId);
  const newName = document.querySelector('#project-name-edit').value;
  project.name = newName;
  project.taskList().forEach((task) => squashEdit(task.id));
  reloadList();
  renderProjectList();
  hideMenu('rename-project-menu');
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
