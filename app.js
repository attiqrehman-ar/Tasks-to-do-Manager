// Select elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');

// Initialize tasks array from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display tasks
function displayTasks() {
    taskList.innerHTML = ''; // Clear the list before rendering

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
            </div>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask(e) {
    e.preventDefault();

    const newTask = {
        title: taskTitle.value,
        description: taskDesc.value
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();

    // Clear form
    taskTitle.value = '';
    taskDesc.value = '';
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Function to edit a task
function editTask(index) {
    const task = tasks[index];
    taskTitle.value = task.title;
    taskDesc.value = task.description;

    // Remove the old task once it’s edited
    deleteTask(index);
}

// Event listener for adding tasks
taskForm.addEventListener('submit', addTask);

// Display tasks when the page loads
displayTasks();
