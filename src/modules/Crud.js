
const ul = document.createElement('ul');
const todoContainer = document.querySelector('.todo-container');
class Task {
    constructor(description,completed,index){
        this.description=description;
        this.completed=completed;
        this.index=index;
    }   
}

let addTask = (inputVal,tasksArr)=>{
    let taskObj= new Task(inputVal,false,tasksArr.length);
    let localData = JSON.parse(localStorage.getItem('tasks'));
    tasksArr.push(taskObj);
    localData.push(taskObj);
    localStorage.setItem('tasks',JSON.stringify(localData));
    window.location.reload();
}

const displayTasks = (tasks) => {
 
   
    tasks.forEach((task) => {
      ul.innerHTML
      += `
      <li class="task-item">
          <div class="task-value" id=${task.index}>
              <input type="checkbox" id=${task.index} name=${task.index} value=${task.description} class="task-checkbox">
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


  
let optionsButton = (taskArr)=>{
  const optionsBtn = document.querySelectorAll('.options-btn');
  optionsBtn.forEach(option=>{
    option.addEventListener('click',(e)=>{
        e.preventDefault();
        option.parentElement.classList.toggle('task-item-edit');
        option.classList.toggle('btn-toggle');
        option.nextElementSibling.classList.toggle('btn-toggle');
        editTodo(option,taskArr); 
    })
  })
}

let editTodo = (optionBtn,taskArr)=>{
    let todoDiv = optionBtn.previousElementSibling;
    let labelDesc = todoDiv.lastElementChild;
    let listContainer = todoDiv.parentElement;
    let editInput = document.createElement('input');
    editInput.type="text";
    editInput.className="edit-input";
    editInput.value = labelDesc.textContent;
    todoDiv.replaceChild(editInput,labelDesc);
    editInput.focus();
    editInput.addEventListener('keypress',(e)=>{
        if(e.key==='Enter'){
            const localData = JSON.parse(localStorage.getItem('tasks'));
            localData[todoDiv.id].description=editInput.value;
            taskArr=localData;
            localStorage.setItem('tasks',JSON.stringify(taskArr));
            labelDesc.textContent=editInput.value;
            todoDiv.replaceChild(labelDesc,editInput);
            listContainer.classList.remove('task-item-edit');
            optionBtn.classList.toggle('btn-toggle');
            optionBtn.nextElementSibling.classList.toggle('btn-toggle');
            
        }
    }) 
}

 let removeButtonClicked = (taskArr)=>{
    const removeBtn = document.querySelectorAll('.delete-btn');
    removeBtn.forEach(remove=>{
        const listContainer = remove.parentElement;
        let todoContainer = listContainer.firstElementChild;
        remove.addEventListener('click',(e)=>{
            e.preventDefault();
            remove.classList.toggle('btn-toggle');
            removeTodo(todoContainer.id,listContainer,taskArr);
        })
    })
 }

let removeTodo = (todoId,listContainer,taskArr)=>{
    listContainer.remove();
    let localData = JSON.parse(localStorage.getItem('tasks'));
   localData = localData.filter(data=>data.index!=todoId);
   localData.forEach((data,i)=>{
    data.index = i;
   })
    taskArr = localData;
    localStorage.setItem('tasks',JSON.stringify(localData));
    console.log(JSON.parse(localStorage.getItem('tasks')));
}


export  {addTask, displayTasks, optionsButton, removeButtonClicked};
