var taskInfo = document.getElementById('task-info');

var listOfTasks = []

var tasksList=()=> {
    taskInfo.innerHTML = ""
    for(var i=0; i<listOfTasks.length;i++){
        taskInfo.innerHTML += `
            <div class="created-task">
                <p>${listOfTasks[i]}</p>
                <br>
            </div>
        `
    }
}

const addTask = (e) => {
    var text = document.querySelector("#make-task");
    console.log(text.value);
    listOfTasks.push(text.value);
    tasksList();
    text.value='';
}

document.querySelector("#task_transmit").addEventListener("click",function(e){
    e.preventDefault();
    addTask();
})

