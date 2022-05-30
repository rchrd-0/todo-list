import { projectFactory, projectMaster } from './projects';
import { hideMenu, showAddProject } from './form-controller';
import { renderProjectList } from './display';

function createProject() {
  const projectId = projectMaster.read().length + 3;
  const projectName = document.querySelector('#project-name-add').value;

  const newProject = projectFactory(projectId, projectName);
  projectMaster.push(newProject);
  hideMenu('add-project-menu');
  renderProjectList();
}

function initializeButtonEvents() {
  const showAddProjectBtn = document.querySelector('#show-add-project');
  const submitAddProject = document.querySelector('#submit-add-project');
  showAddProjectBtn.addEventListener('click', showAddProject);
  submitAddProject.addEventListener('click', createProject);
}

function initializeInbox() {
  const inbox = projectFactory(3, 'Inbox');
  projectMaster.push(inbox);
}

function initializeProjectHandler() {
  initializeButtonEvents();
  initializeInbox();
}

export { createProject, initializeProjectHandler };
