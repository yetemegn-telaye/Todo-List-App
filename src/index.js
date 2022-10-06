import './style.css';
import {addTask, displayTasks, optionsButton} from './modules/Crud.js';

let taskLists = [];
let taskInput = document.querySelector('.add-task-input');

let main = ()=>{
  //localStorage.setItem('tasks',JSON.stringify([]));
  if (localStorage.getItem('tasks') === null) {
    taskLists=[];
  } else {
    taskLists = JSON.parse(localStorage.getItem('tasks'));
  }
  taskInput.addEventListener('keypress',e=>{
    if(e.key === 'Enter' && taskInput.value){
        e.preventDefault();
        addTask(taskInput.value, taskLists);
        taskInput.value=null;
    }
  });
  displayTasks(taskLists);
  optionsButton();
  
}

main();
