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
        listContainer.innerHTML += `<li class=" " key=${task.id}> ${task.task}
        <div class="text-end float-end buttons">
        <i class="fa-solid fa-pen-to-square edit-btn"></i> <i class="fa-solid fa-trash-can delete-btn"></i> 
        </div>
    </li> <hr/>`;
    //     listContainer.innerHTML += `<li class=" " key=${task.id}> ${task.task}
    //     <div class="text-end float-end">
    //         <button class="edit-btn btn btn-success pt-0 pb-0"> Edit </button> <button class="delete-btn btn btn-danger pt-0 pb-0"> Delete </button>
    //     </div>
    // </li> <hr/>`;
    })
    addEvents();
}
refresh();



// function to add new tasks to the localStorage
let globalId = null;
function addTask(){
    const input_task = document.querySelector('#input_task');

    console.log("Global ID ",globalId);

    let tasks = getTasks();
    let updated_array = [];
    if(globalId){
       updated_array = tasks.map(val=> {
            if(globalId == val.id){
                val.task = input_task.value;
            }
            return val;
        });
        console.log("status : ",updated_array);
    }else{
        const data = {
            id : Math.floor(Math.random() * 10000),
            task : input_task.value
        }    
        updated_array = [...tasks, data];
    }
    window.localStorage.setItem('tasks', JSON.stringify(updated_array));    
    // console.log(tasks);    
    globalId = null;
    // addEvents();
}


// this eventHandler will be called when user submit the form and then refresh() will update the UI
document.querySelector('#form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const input_task = document.querySelector('#input_task');

    if(input_task.value.length > 0){
        // console.log("Redy to submit");        
        addTask();
        input_task.value = '';
        refresh();
    }else{
        // console.log("Please Fill the input");
    }

})



// Add event handler on delete and edit butotns
function addEvents(){
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const editBtns = document.querySelectorAll('.edit-btn');
    
    for(let deleteBtn of deleteBtns){
        deleteBtn.addEventListener('click',()=>{
            console.log('clicked fired');
            // console.log('delete clicked');
            const currentEle = deleteBtn.parentElement.parentElement;
            // console.log(currentEle);
            // console.log(currentEle.getAttribute('key'));
            deleteTask(currentEle.getAttribute('key'));            
            refresh();
        })
    }

    for(let editBtn of editBtns){
        editBtn.addEventListener('click',()=>{
            console.log('clicked fired');
            // console.log('delete clicked');
            const currentEle = editBtn.parentElement.parentElement;
            // console.log(currentEle);
            console.log(currentEle.getAttribute('key'));
            editTask(currentEle.getAttribute('key'));
            refresh();
        })
    }
    // console.log(deleteBtns);
    // console.log(deleteBtns.length);
}
// addEvents();



//this function deletes task from localStorage when Id matched and then refresh() update UI
function deleteTask(id){
    const tasks = getTasks();
    console.log(tasks);
    const newtasks = tasks.filter(task=> task.id != id);
    window.localStorage.setItem('tasks', JSON.stringify(newtasks));
    refresh();
    console.log(newtasks);
}



function editTask(id){
    const tasks = getTasks();
    const selectedTask = tasks.find(task => task.id == id);
    let input_task = document.querySelector('#input_task');
    
    globalId = selectedTask.id;
    input_task.value = selectedTask.task;
    console.log("Selected task : ",selectedTask);
}