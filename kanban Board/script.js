const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done]

let dragTask = null;

function attachTaskEvent(task){
    task.setAttribute('draggable', 'true');

    task.addEventListener('dragstart', () => {
        dragTask = task;
    })

    task.addEventListener('dragend', () => {
        dragTask = null;
    });

    const deleteBtn = task.querySelector('button');
    if(deleteBtn){
        deleteBtn.addEventListener('click', () => {
            task.remove()
            updateCounts()
        })
    }
}

document.querySelectorAll('.task').forEach(attachTaskEvent)

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
    column.classList.remove('hover-over');

    if(!dragTask) return;

const taskContainer = column.querySelector('.task-list') || column;
   taskContainer.appendChild(dragTask);

updateCounts();
})
}

function saveBoardState() {
 
  const boardData = {
    todo: [],
    progress: [],
    done: []
  };

  columns.forEach(col => {
    const colId = col.id; 
    const allCards = col.querySelectorAll('.task');

    allCards.forEach(card => {
      boardData[colId].push({
        title: card.querySelector('h2').textContent,
        desc: card.querySelector('p').textContent
      });
    });
  });

  localStorage.setItem('myKanbanData', JSON.stringify(boardData));
}

function loadBoardState() {

  const savedData = localStorage.getItem('myKanbanData');

  if (savedData) {
    const parsedData = JSON.parse(savedData); 

    columns.forEach(col => {
      const colId = col.id;
      const list = col.querySelector('.task-list') || col;

      list.innerHTML = '';

      if (parsedData[colId]) {
        parsedData[colId].forEach(item => {
          const card = createTaskElement(item.title, item.desc);
          list.appendChild(card);
        });
      }
    });
  }

  updateCounts();
}


addDragAndDropListeners(todo);
addDragAndDropListeners(progress);
addDragAndDropListeners(done);

 function updateCounts() {
  columns.forEach(col => {
    const tasks = col.querySelectorAll('.task');
    const count = col.querySelector('.right .count');
    if (count) count.textContent = tasks.length;
  });
}

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

    const titleInput = document.querySelector('#task-title-input');
    const descInput = document.querySelector('#task-desc-input');

    const taskTitle = titleInput.value.trim()
    const taskDesc = descInput.value.trim();

    if (!taskTitle) {
    alert('Task title is required!');
    return;
  }
    const div = document.createElement('div');

    div.classList.add('task')


    div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDesc}</p>
    <button type='button'>Delete</button>
    `;

    attachTaskEvent(div);

    const taskContainer = todo.querySelector('.task-list') || todo;
   taskContainer.appendChild(div);
   
titleInput.value = ''
descInput.value = ''

    modal.classList.remove('active');
    updateCounts();
})

updateCounts();
