const { editTodo, updateCompleted, clearCompleted } = require('./taskStatusUpdate');
const { addTask } = require('./Crud');

let taskArr = [];

describe('task status updates', () => {
  test('editing a todo task description on the local storage', () => {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = 'updated task';
    const todoDiv = document.createElement('div');
    todoDiv.className = 'task-value';
    todoDiv.id = 0;
    addTask('test input value', taskArr);
    editTodo(editInput, todoDiv, taskArr);
    taskArr = JSON.parse(localStorage.getItem('tasks'));
    const lc = JSON.parse(localStorage.getItem('tasks'));
    expect(lc[todoDiv.id].description).toBe(editInput.value);
  });
  test('Updating item completed status', () => {
    const completedStatus = JSON.parse(localStorage.getItem('tasks'))[0].completed;
    updateCompleted(taskArr, 0);
    expect(JSON.parse(localStorage.getItem('tasks'))[0].completed).toBe(!completedStatus);
  });

  test('clear completed tasks', () => {
    clearCompleted(taskArr);
    expect(localStorage.getItem('tasks')).toBe('[]');
  });
});