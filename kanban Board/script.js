const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

let dragTask = null;

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => task.addEventListener('drag', (e) => {
 dragTask = task;
}))

function addDragAndDropListeners (column){
column.addEventListener('dragenter', (e) => {
    e.preventDefault();
    column.classList.add('hover-over');
})

column.addEventListener('dragleave', (e) => {
    e.preventDefault();
    column.classList.remove('hover-over');
})

column.addEventListener('dragover', (e) => {
    e.preventDefault();
})

column.addEventListener('drop', (e) => {
    e.preventDefault();
        console.log('dropped', dragTask, column);
        column.appendChild(dragTask);
    column.classList.remove('hover-over');
})
}

addDragAndDropListeners(todo);
addDragAndDropListeners(progress);
addDragAndDropListeners(done);

const toggleModalButton = document.querySelector('#toggle-modal');
const modalBg = document.querySelector('.modal .bg');
const modal = document.querySelector('.modal');
const addTaskButton = document.querySelector('#add-new-task')

toggleModalButton.addEventListener('click', (e) => {
    modal.classList.toggle('active');
})

modalBg.addEventListener('click', (e) => {
    modal.classList.remove('active')
})

addTaskButton.addEventListener('click', () => {

    const taskTitle = document.querySelector('#task-title-input').value;
    const taskDesc = document.querySelector('#task-desc-input').value;

    const div = document.createElement('div');

    div.classList.add('task')
    div.setAttribute('draggable', 'true')

    div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDesc}</p>
    <button>Delete</button>
    `
    todo.appendChild(div);

    div.addEventListener('drag', (e) => {
        dragTask = div;
    })

    modal.classList.remove('active');
})

