const checkBoxClicked = (taskArr) => {
  const checkBoxInputs = document.querySelectorAll('.task-checkbox');
  checkBoxInputs.forEach((checkBox) => {
    const labelInput = checkBox.nextElementSibling;
    // let localData = JSON.parse(localStorage.getItem('tasks'));

    checkBox.addEventListener('change', (e) => {
      e.preventDefault();
      if (checkBox.checked === true) {
        labelInput.style.textDecoration = 'line-through';
        taskArr[checkBox.id].completed = true;
        localStorage.setItem('tasks', JSON.stringify(taskArr));
      } else {
        labelInput.style.textDecoration = 'none';
        taskArr[checkBox.id].completed = false;
        localStorage.setItem('tasks', JSON.stringify(taskArr));
      }
    });
  });
};

const clearCompletedClicked = (taskArr) => {
  const clearBtn = document.querySelector('.clear-btn');
  clearBtn.addEventListener('click', () => {
    const uncompleteTask = taskArr.filter((task) => task.completed !== true);
    taskArr = uncompleteTask;
    localStorage.setItem('tasks', JSON.stringify(taskArr));
    window.location.reload();
  });
};

export { checkBoxClicked, clearCompletedClicked };