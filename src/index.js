import './style.css';
import {
  addTask, displayTasks, optionsButton, removeButtonClicked,
} from './modules/Crud.js';

let taskLists = [];
const taskInput = document.querySelector('.add-task-input');

const main = () => {
  // localStorage.setItem('tasks',JSON.stringify([]));
  if (localStorage.getItem('tasks') === null) {
    taskLists = [];
  } else {
    taskLists = JSON.parse(localStorage.getItem('tasks'));
  }
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && taskInput.value) {
      e.preventDefault();
      addTask(taskInput.value, taskLists);
      taskInput.value = null;
    }
  });
  displayTasks(taskLists);
  optionsButton(taskLists);
  removeButtonClicked(taskLists);
};

main();
