const {addTask,removeTodo} = require('./Crud');
let arrTest = [];

describe('Task',()=>{
  test("adds task to local storage", () => {
    addTask("test input value", arrTest);
    const ul = document.createElement('ul');
    ul.innerHTML+=`
      <li class="task-item" id=${arrTest[0].index}>

      </li>
        `;
        arrTest.push(localStorage.getItem('tasks'));
    expect(localStorage.getItem('tasks')).not.toBeNull();
    expect(ul).not.toBeNull();
  });


})

