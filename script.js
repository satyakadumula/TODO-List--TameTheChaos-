let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = {
        id: Date.now(),
        text: taskText
    };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
};

const editTask = (taskId) => {
    const taskElement = document.getElementById(`task-${taskId}`);
    const taskTextElement = taskElement.querySelector(".task-text");
    const editInput = taskElement.querySelector(".edit-input");
    const editButton = taskElement.querySelector(".edit-button");

    if (editButton.innerText === "Edit") {
        taskTextElement.style.display = "none";
        editInput.style.display = "block";
        editInput.focus();
        editButton.innerText = "Save";
    } else {
        const newTaskText = editInput.value.trim();
        if (newTaskText === "") return;

        const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks[taskIndex].text = newTaskText;

        taskTextElement.innerText = newTaskText;
        taskTextElement.style.display = "block";
        editInput.style.display = "none";
        editButton.innerText = "Edit";
    }
};

const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
};

const handleKeyPress = (event, taskId) => {
    if (event.key === "Enter") {
        if (taskId !== undefined) {
            editTask(taskId);
        } else {
            addTask();
        }
    }
};

const renderTasks = () => {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";
    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.id = `task-${task.id}`;
        taskElement.innerHTML = `
            <span class="task-text">${task.text}</span>
            <input type="text" class="edit-input" style="display:none;" value="${task.text}" onkeypress="handleKeyPress(event, ${task.id})">
            <div class="buttons">
                <button class="edit-button" onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });
};

// Event listener for the Enter key on the task input field
document.getElementById("new-task").addEventListener("keypress", function(event) {
    handleKeyPress(event);
});
