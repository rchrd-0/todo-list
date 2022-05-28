import _ from 'lodash';

const taskFactory = (id, name, description, date, completed = false) => {
  return {
    id,
    name,
    description,
    date,
    completed
    // project,
    // priority,
  };
};

const taskMaster = (() => {
  const taskList = [];
  const push = (task) => taskList.push(task);
  const read = () => taskList;
  const findTask = (id) => {
    const idNum = Number(id);
    const thisTask = read().find(item => item.id === idNum);
    return thisTask;
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
    remove,
  };
})();

export { taskFactory, taskMaster };
