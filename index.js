function getTasks(){
    const tasks = JSON.parse(window.localStorage.getItem('tasks') ? window.localStorage.getItem('tasks') : '[]' );    
    return tasks;
}

//render list after delete/add/edit operations
function refresh(){
    const listContainer = document.querySelector('.list-container');
    const tasks = getTasks();
    listContainer.innerHTML = '';
    tasks.forEach(task=>{
        listContainer.innerHTML += `<li class=" " key=${task.id}> <input type="checkbox" class="checkbox"/> ${task.task}
        <div class="text-end float-end buttons">
       <i class="fa-solid fa-pen-to-square edit-btn"></i> <i class="fa-solid fa-trash-can delete-btn"></i> 
        </div>
    </li> <hr/>`;    
    })
    addEvents();
}
refresh();



// function to add new tasks to the localStorage
let globalId = null;
function addTask(){
    const input_task = document.querySelector('#input_task');

    let tasks = getTasks();
    let updated_array = [];
    if(globalId){
       updated_array = tasks.map(val=> {
            if(globalId == val.id){
                val.task = input_task.value;
            }
            return val;
        });
    }else{
        const data = {
            id : Math.floor(Math.random() * 10000),
            task : input_task.value,
            status:false
        }    
        updated_array = [...tasks, data];
    }
    window.localStorage.setItem('tasks', JSON.stringify(updated_array));   
    globalId = null;
    // addEvents();
}


// this eventHandler will be called when user submit the form and then refresh() will update the UI
document.querySelector('#form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const input_task = document.querySelector('#input_task');

    if(input_task.value.length > 0){
     
        addTask();
        input_task.value = '';
        refresh();
    }
})



// Add event handler on delete and edit butotns
function addEvents(){
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const editBtns = document.querySelectorAll('.edit-btn');
    const checkboxs = document.querySelectorAll('.checkbox');
    
    for(let deleteBtn of deleteBtns){
        deleteBtn.addEventListener('click',()=>{
            
            const currentEle = deleteBtn.parentElement.parentElement;
            
            deleteTask(currentEle.getAttribute('key'));            
            refresh();
        })
    }

    for(let editBtn of editBtns){
        editBtn.addEventListener('click',()=>{            
            const currentEle = editBtn.parentElement.parentElement;
            editTask(currentEle.getAttribute('key'));
            refresh();
        })
    }
    
}



//this function deletes task from localStorage when Id matched and then refresh() update UI
function deleteTask(id){
    const tasks = getTasks();
    
    const newtasks = tasks.filter(task=> task.id != id);
    window.localStorage.setItem('tasks', JSON.stringify(newtasks));
    refresh();    
}



function editTask(id){
    const tasks = getTasks();
    const selectedTask = tasks.find(task => task.id == id);
    let input_task = document.querySelector('#input_task');
    
    globalId = selectedTask.id;
    input_task.value = selectedTask.task;
    
}