import _ from 'lodash';

const taskFactory = (id, name, description, date, projectId, completed = false) => {
  return {
    id,
    name,
    description,
    date,
    projectId,
    completed,
    // priority,
  };
};

const taskMaster = (() => {
  const taskList = [];
  const push = (task) => taskList.push(task);
  const read = () => taskList;
  const findTask = (id) => {
    const idNum = Number(id);
    return read().find(item => item.id === idNum);
  }
  const findProject = (id) => {
    const idNum = Number(id);
    return read().find(project => project.id === idNum);
  }
  const remove = (id) => {
    const idNum = Number(id);
    _.remove(read(), findTask(idNum));
    read().forEach(task => {
      if (task.id > idNum) {
        task.id -= 1;
      }
    })
  }

  return {
    push,
    read,
    findTask,
    findProject,
    remove,
  };
})();

export { taskFactory, taskMaster };
