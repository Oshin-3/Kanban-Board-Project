const addTaskButtonRef = document.getElementById('add-task-button');
const modalRef = document.querySelector('.modal-container');
const tasksRef = document.querySelectorAll('.task-details');
const createTaskRef = document.getElementById('createTask');
const editTaskRef = document.getElementById('editTask');
const taskContainerRef = document.querySelector('.tasks-container');
const tasknameRef = document.querySelector('.modal-container .form-container .task-form .task-name .task-details');
const taskDescriptionRef = document.querySelector('.modal-container .form-container .task-form .task-description .task-details');
const taskCategoryRef = document.getElementById('category-dropdown');
const dueDateRef = document.getElementById('due-date');
const priorityRef = document.getElementById('priority');

//console.log(tasksRef.value, taskDescriptionRef.value, taskCategoryRef.options[taskCategoryRef.selectedIndex].value, dueDateRef.value, priorityRef.value);


const kanbanTasks = (JSON.parse(localStorage.getItem('kanbanTasks')) || []);

// toggleModal code
addTaskButtonRef.addEventListener('click', function(e)
{
    editTaskRef.classList.add('hide');
    createTaskRef.classList.remove('hide');
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

    tasksRef.forEach((task) => {
        task.value = "";
    })
}
// toggleModal code

//create task
createTaskRef.addEventListener('click', function(e)
{
    // const taskNameRef = document.querySelector('.modal-container .form-container .task-form .task-name .task-details');
    // const taskDescriptionRef = document.querySelector('.modal-container .form-container .task-form .task-description .task-details');
    // const taskCategoryRef = document.getElementById('category-dropdown');
    // const dueDateRef = document.getElementById('due-date');
    // const priorityRef = document.getElementById('priority');

    // console.log(taskNameRef.value, taskDescriptionRef.value, taskCategoryRef.options[taskCategoryRef.selectedIndex].value, dueDateRef.value, priorityRef.value);

    const task = 
    {
        taskId : Math.random(),
        taskName : tasknameRef.value,
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
    //console.log("inside addTaskInCategory > ", task);
    const ticketContainerRef = document.createElement('div');
    ticketContainerRef.classList.add('ticket-container');
    ticketContainerRef.dataset.id = task.taskId;
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
            <div class="ticket-edit-panel">
                <div id="ticket-duedate"><p><i class="fa-solid fa-calendar-days"></i> <span>${task.dueDate}</span></p></div>
                <span id="delete-ticket" title="Delete"><i class="fa-solid fa-trash"></i></span>
                <span id="edit-ticket" title="Edit"><i class="fa-solid fa-pen"></i></span>
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

//delete ticket
taskContainerRef.addEventListener('click', function(e)
{
    if (e.target.classList.contains('fa-trash'))
    {
        if (window.confirm('Are you sure you want to delete the task?'))
        {
            const ticketContainer= e.target.closest('.ticket-container');
            const ticketID = ticketContainer.dataset.id;
            //console.log(ticketID, ticketContainer);
            ticketContainer.remove();
            deleteTicketFromTheData(ticketID);
        }

    }

    //edit ticket
    if (e.target.classList.contains('fa-pen'))
    {
        const ticketID = e.target.closest('.ticket-container').dataset.id;
        editTicket(ticketID);
    }
});

function deleteTicketFromTheData(ticketID)
{
    const selectedTask = kanbanTasks.findIndex((ticket) => ticket.taskId == ticketID);
    //console.log("ticket: ", ticketID)
    kanbanTasks.splice(selectedTask, 1);
    localStorage.setItem('kanbanTasks', JSON.stringify(kanbanTasks));
}
//delete ticket

//edit ticket
function editTicket(ticketID)
{
    toggleModal();
    editTaskRef.classList.remove('hide');
    createTaskRef.classList.add('hide');
    const selectedTask = kanbanTasks.findIndex((ticket) => ticket.taskId == ticketID);
    tasknameRef.value = kanbanTasks[selectedTask].taskName;
    taskDescriptionRef.value = kanbanTasks[selectedTask].taskDescription;
    taskCategoryRef.value = kanbanTasks[selectedTask].category;
    dueDateRef.value = kanbanTasks[selectedTask].dueDate;
    priorityRef.value = kanbanTasks[selectedTask].priority;

    
    editTaskRef.addEventListener('click', function(e)
    {
        console.log("Edit click");
        
        editTicketFromData(selectedTask);  
        toggleModal();  
        location.reload();
    })
}

function editTicketFromData(selectedIndex)
{
    kanbanTasks[selectedIndex].taskName = tasknameRef.value;
    kanbanTasks[selectedIndex].taskDescription = taskDescriptionRef.value;
    kanbanTasks[selectedIndex].category = taskCategoryRef.value;
    kanbanTasks[selectedIndex].dueDate = dueDateRef.value;
    kanbanTasks[selectedIndex].priority = priorityRef.value;
    localStorage.setItem('kanbanTasks', JSON.stringify(kanbanTasks));
}
//edit ticket