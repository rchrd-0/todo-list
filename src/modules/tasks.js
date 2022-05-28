const taskFactory = (id, name, description, date) => {
  return {
    id,
    name,
    description,
    date,
    // project,
    // priority,
    // completed,
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

  return {
    push,
    read,
    findTask
  };
})();

export { taskFactory, taskMaster };
