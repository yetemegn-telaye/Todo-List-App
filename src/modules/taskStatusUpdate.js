
const editTodo = (editInput,todoDiv, taskArr)=>{
  
  const localData = JSON.parse(localStorage.getItem('tasks'));

      localData[todoDiv.id].description = editInput.value;
      taskArr = localData;
      localStorage.setItem('tasks', JSON.stringify(taskArr));
      
}


const editTodoInput = (optionBtn, taskArr) => {
  const todoDiv = optionBtn.previousElementSibling;
  const labelDesc = todoDiv.lastElementChild;
  const listContainer = todoDiv.parentElement;
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = labelDesc.textContent;
  todoDiv.replaceChild(editInput, labelDesc);
  editInput.focus();
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      editTodo(editInput,todoDiv, taskArr);
      labelDesc.textContent = editInput.value;
      todoDiv.replaceChild(labelDesc, editInput);
      listContainer.classList.remove('task-item-edit');
      optionBtn.classList.toggle('btn-toggle');
      optionBtn.nextElementSibling.classList.toggle('btn-toggle');
    }
  });
};

const optionsButton = (taskArr) => {
  const optionsBtn = document.querySelectorAll('.options-btn');
  optionsBtn.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      option.parentElement.classList.toggle('task-item-edit');
      option.classList.toggle('btn-toggle');
      option.nextElementSibling.classList.toggle('btn-toggle');
      editTodoInput(option, taskArr);
    });
  });
};

const updateCompleted = (taskArr,checkBoxId)=>{
      taskArr[checkBoxId].completed = !taskArr[checkBoxId].completed;
      localStorage.setItem('tasks', JSON.stringify(taskArr));
}

const checkBoxClicked = (taskArr) => {
  const checkBoxInputs = document.querySelectorAll('.task-checkbox');
  checkBoxInputs.forEach((checkBox) => {
    const labelInput = checkBox.nextElementSibling;

    checkBox.addEventListener('change', (e) => {
      e.preventDefault();
      if (checkBox.checked === true) {
        labelInput.style.textDecoration = 'line-through';
        updateCompleted(taskArr,checkBox.id);
      } else {
        labelInput.style.textDecoration = 'none';
       updateCompleted(taskArr,checkBox.id);
      }
    });
  });
};

const clearCompleted = (taskArr)=>{
  const uncompleteTask = taskArr.filter((task) => task.completed !== true);
  taskArr = uncompleteTask;
  localStorage.setItem('tasks', JSON.stringify(taskArr));
}

const clearCompletedClicked = (taskArr) => {
  const clearBtn = document.querySelector('.clear-btn');
  clearBtn.addEventListener('click', () => {
    clearCompleted(taskArr);
    window.location.reload();
  });
};

module.exports= { checkBoxClicked, clearCompletedClicked,optionsButton,editTodo,clearCompleted, updateCompleted };