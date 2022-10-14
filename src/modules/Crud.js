const ul = document.createElement('ul');
const todoContainer = document.querySelector('.todo-container');
class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const addTask = (inputVal, tasksArr) => {
  const taskObj = new Task(inputVal, false, tasksArr.length);
  tasksArr.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
  // window.location.reload();
};

const displayTasks = (tasks) => {
  tasks.forEach((task) => {
    ul.innerHTML += `
      <li class="task-item" id=${task.index}>
          <div class="task-value" id=${task.index}>
              <input type="checkbox" id=${task.index} name=${task.index} class="task-checkbox">
              <label for=${task.index} class="val-desc"> ${task.description}</label>
          </div>
         <button class="options-btn">
            <i class="fas fa-ellipsis-v" ></i>
        </button>
        <button class="delete-btn btn-toggle">
            <i class="fas fa-trash-alt"></i>
        </button>
        
      </li>
     `;
  });
  todoContainer.appendChild(ul);
};

const editTodo = (optionBtn, taskArr) => {
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
      const localData = JSON.parse(localStorage.getItem('tasks'));
      localData[todoDiv.id].description = editInput.value;
      taskArr = localData;
      localStorage.setItem('tasks', JSON.stringify(taskArr));
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
      editTodo(option, taskArr);
    });
  });
};

const removeTodo = (todoId, listContainer, taskArr) => {
  listContainer.remove();
  let localData = JSON.parse(localStorage.getItem('tasks'));
  const todoIdString = Number(todoId);
  localData = localData.filter((data) => data.index !== todoIdString);
  localData.forEach((data, i) => {
    data.index = i;
  });
  taskArr = localData;
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};

const removeButtonClicked = (taskArr) => {
  const removeBtn = document.querySelectorAll('.delete-btn');
  removeBtn.forEach((remove) => {
    const listContainer = remove.parentElement;
    const todoContainer = listContainer.firstElementChild;
    remove.addEventListener('click', (e) => {
      e.preventDefault();
      remove.classList.toggle('btn-toggle');
      removeTodo(todoContainer.id, listContainer, taskArr);
    });
  });
};

module.exports = {
  addTask, displayTasks, removeTodo, optionsButton, removeButtonClicked,
};
