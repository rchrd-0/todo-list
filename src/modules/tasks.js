const taskFactory = (id, name, description) => {
  return {
    id,
    name,
    description,
    // date,
    // project,
    // priority,
    // completed,
  };
};

const taskMaster = (() => {
  const taskList = [];
  const push = (task) => taskList.push(task);
  const read = () => taskList;

  return {
    push,
    read
  }
})();

export { taskFactory, taskMaster };
