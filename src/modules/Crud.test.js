const { addTask, removeTodo } = require('./Crud');

const arrTest = [];

describe('Task', () => {
  test('adds task to local storage', () => {
    addTask('test input value', arrTest);
    const ul = document.createElement('ul');
    ul.innerHTML += `
      <li class="task-item" id=${arrTest[0].index}>
      </li>
        `;
    arrTest.push(localStorage.getItem('tasks'));
    expect(localStorage.getItem('tasks')).not.toBe([]);
    expect(ul).not.toBeNull();
  });
});
test('remove task from the local storage and li from the DOM', () => {
  const todoId = 0;
  const listContainer = document.createElement('li');
  listContainer.className = 'task-item';
  listContainer.id = 0;
  removeTodo(todoId, listContainer, arrTest);
  expect(localStorage.getItem('tasks')).toEqual('[]');
  expect(document.contains(listContainer)).toBe(false);
});