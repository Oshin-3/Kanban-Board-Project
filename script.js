const addTaskButtonRef = document.getElementById('add-task-button');
const modalRef = document.querySelector('.modal-container');
const taskNameRef = document.querySelectorAll('.task-details');
const createTaskRef = document.getElementById('createTask');

const allTasks = (JSON.parse(localStorage.getItem('allTasks')) || []);

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


createTaskRef.addEventListener('click', function(e)
{
    
});