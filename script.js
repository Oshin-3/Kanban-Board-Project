const addTaskButtonRef = document.getElementById('add-task-button');
const modalRef = document.querySelector('.modal-container');
const taskNameRef = document.querySelectorAll('.task-details');
const createTaskRef = document.getElementById('createTask');

const kanbanTasks = (JSON.parse(localStorage.getItem('kanbanTasks')) || []);

// toggleModal code
addTaskButtonRef.addEventListener('click', function(e)
{
    toggleModal();
});

function toggleModal()
{
    if(modalRef.classList.contains('hide'))
    {
        modalRef.classList.remove('hide');
    }
    else
    {
        defaultModal();
        modalRef.classList.add('hide');
    }
}

function defaultModal()
{
    const firstCategoryRef = document.querySelectorAll('.task-filters-container .task .task-filer');
    //console.log(firstCategoryRef);
    const dueDateRef = document.getElementById('due-date');
    dueDateRef.value = "";
    //console.log(dueDateRef.value);
    firstCategoryRef.forEach((category) => {
        category.selectedIndex = 0;
    });

    taskNameRef.forEach((task) => {
        task.value = "";
    })
}
// toggleModal code

//create task
createTaskRef.addEventListener('click', function(e)
{
    const taskNameRef = document.querySelector('.modal-container .form-container .task-form .task-name .task-details');
    const taskDescriptionRef = document.querySelector('.modal-container .form-container .task-form .task-description .task-details');
    const taskCategoryRef = document.getElementById('category-dropdown');
    const dueDateRef = document.getElementById('due-date');
    const priorityRef = document.getElementById('priority');

    console.log(taskNameRef.value, taskDescriptionRef.value, taskCategoryRef.options[taskCategoryRef.selectedIndex].value, dueDateRef.value, priorityRef.value);

    const task = 
    {
        taskName : taskNameRef.value,
        taskDescription : taskDescriptionRef.value,
        category : taskCategoryRef.value,
        dueDate : dueDateRef.value,
        priority : priorityRef.value
    }

    addTaskInData(task);
    addTaskInCategory(task);
    toggleModal();
    
});

function addTaskInData(task)
{
    kanbanTasks.push(task);
    localStorage.setItem('kanbanTasks', JSON.stringify(kanbanTasks));
    //console.log(kanbanTasks);
}

function addTaskInCategory(task)
{
    console.log("inside addTaskInCategory > ", task);
    const ticketContainerRef = document.createElement('div');
    ticketContainerRef.classList.add('ticket-container');
    ticketContainerRef.innerHTML = `
        <div class="tickets">
            <div class="ticket-name">
                <p style="font-weight: bold;">${task.taskName}</p>
            </div>
            <div class="ticket-description">
                <p>${task.taskDescription}</p>
            </div>
            <div class="ticket-priority">
                <i class="fa-solid fa-flag low" id="${task.priority}"></i>
            </div>
            <hr>
            <div class="ticket-due-date">
                <p><i class="fa-solid fa-calendar-days"></i> <span>${task.dueDate}</span></p>
            </div>
        </div>
        `;

    const openCategoryRef = document.getElementById('open-category-container');
    const inProcessCategoryRef = document.getElementById('inProcess-category-container');
    const reviewCategoryRef = document.getElementById('review-category-container');
    const blockedCategoryRef = document.getElementById('blocked-category-container');
    const closeCategoryRef = document.getElementById('close-category-container');

    //console.log(task.category);
    if (task.category === 'open')
    {
        openCategoryRef.appendChild(ticketContainerRef);
    }
    else if (task.category === 'inProcess')
    {
        inProcessCategoryRef.appendChild(ticketContainerRef);
    }
    else if (task.category == 'review')
    {
        reviewCategoryRef.appendChild(ticketContainerRef);
    }
    else if (task.category == 'blocked')
    {
        blockedCategoryRef.appendChild(ticketContainerRef);
    }
    else
    {
        closeCategoryRef.appendChild(ticketContainerRef);
    }
}
//create task

//render task
function renderTask()
{
    kanbanTasks.forEach((task) =>
    {
        addTaskInCategory(task);   
    })
}

renderTask();
//render task