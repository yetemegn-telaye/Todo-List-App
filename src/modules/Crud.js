
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
    tasksArr.push(taskObj);
    localStorage.setItem('tasks',JSON.stringify(tasksArr));
    console.log(tasksArr);
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


  
let optionsButton = ()=>{
  const optionsBtn = document.querySelectorAll('.options-btn');
  optionsBtn.forEach(option=>{
    option.addEventListener('click',(e)=>{
        e.preventDefault();
        option.parentElement.classList.toggle('task-item-edit');
        option.classList.toggle('btn-toggle');
        option.nextElementSibling.classList.toggle('btn-toggle');
        editTodo(option);
        
        
    })
  })
}

let editTodo = (optionBtn)=>{
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
            localStorage.setItem('tasks',JSON.stringify(localData));
            labelDesc.textContent=editInput.value;
            todoDiv.replaceChild(labelDesc,editInput);
            listContainer.classList.remove('task-item-edit');
            optionBtn.classList.toggle('btn-toggle');
            optionBtn.nextElementSibling.classList.toggle('btn-toggle');
            
        }
    })
    
    
}

//    let editBtn = ()=>{
//     const optionsBtn = document.querySelectorAll('.options-btn');
//     let taskItem = document.querySelectorAll('.task-item');
//     let trashBtn = document.querySelectorAll('trash-btn');
//     optionsBtn.forEach(taskBtn=>{
        
      
//         taskBtn.addEventListener('click',e=>{
//             e.preventDefault();
//             //console.log(taskVal);
//             taskItem.forEach(item=>{
//                if(item.firstElementChild.firstElementChild.id==taskBtn.id){
//                 console.log(item.firstElementChild.lastElementChild.innerHTML);
//                 item.classList.add('toggle-list');
//                 //console.log(taskBtn.firstElementChild); 
//                 taskBtn.firstElementChild.classList.add("hide");
//                taskBtn.lastElementChild.classList.remove("hide");
//                taskBtn.lastElementChild.classList.add("show");
//                taskBtn.lastElementChild.addEventListener('click',()=>{
//                 console('delete clicked')
//                })
//                 console.log()
//                }
//             })

//         })
//     })
    
//    }


export  {addTask, displayTasks, optionsButton};
