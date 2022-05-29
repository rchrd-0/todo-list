import _ from 'lodash';
import { taskMaster } from './tasks';

const projectFactory = (id, name) => {
  const taskList = () => taskMaster.findProject(id);
  return {
    taskList,
    id,
    name,
  };
};

const projectMaster = (() => {
  const projectList = [];
  const push = (project) => projectList.push(project);
  const read = () => projectList;
  const findProject = (id) => {
    const idNum = Number(id);
    return read().find((project) => project.id === idNum);
  };
  const remove = (id) => {
    const idNum = Number(id);
    _.remove(read(), findProject(id));
    read().forEach((project) => {
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

export { projectFactory, projectMaster };
