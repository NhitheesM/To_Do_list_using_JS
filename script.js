function storeInput() {
    var inputBox = document.getElementsByClassName('input-box')[0];
    var inputVal = inputBox.value.trim();

    if (inputVal !== '') {
        var storedInputs = JSON.parse(localStorage.getItem('storedInputs')) || [];
        storedInputs.push({ task: inputVal, completed: false });
        localStorage.setItem('storedInputs', JSON.stringify(storedInputs));
        alert('Task is Added : ' + inputVal);
        inputBox.value = '';
        displayAllTasks();
    } else {
        alert('Type any Task');
    }
}

function displayAllTasks() {
    var taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    var storedInputs = JSON.parse(localStorage.getItem('storedInputs')) || [];
    storedInputs.forEach(function (input, index) {
        var taskElement = document.createElement('div');
        taskElement.textContent = input.task;

        // Add a class based on completion status
        taskElement.className = input.completed ? 'completed-task' : '';

        // Toggle completion status on click
        taskElement.onclick = function () {
            toggleCompletionStatus(index);
        };

        taskContainer.appendChild(taskElement);
    });
}

function clearStorage() {
    localStorage.removeItem('storedInputs');
    alert('All Tasks are cleared');
    displayAllTasks();
}

function toggleCompletionStatus(index) {
    var storedInputs = JSON.parse(localStorage.getItem('storedInputs')) || [];

    // Toggle the completion status
    storedInputs[index].completed = !storedInputs[index].completed;

    // Update local storage
    localStorage.setItem('storedInputs', JSON.stringify(storedInputs));

    // Update the displayed tasks
    displayAllTasks();
}

function displayActiveTasks() {
    var storedInputs = JSON.parse(localStorage.getItem('storedInputs')) || [];
    var activeTasks = storedInputs.filter(task => !task.completed);

    var taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    activeTasks.forEach(function (input) {
        var taskElement = document.createElement('div');
        taskElement.textContent = input.task;
        taskContainer.appendChild(taskElement);
    });
}

function displayCompletedTasks() {
    var storedInputs = JSON.parse(localStorage.getItem('storedInputs')) || [];
    var completedTasks = storedInputs.filter(task => task.completed);

    var taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    completedTasks.forEach(function (input) {
        var taskElement = document.createElement('div');
        taskElement.textContent = input.task;
        taskElement.className = 'completed-task'; // Apply completed style
        taskContainer.appendChild(taskElement);
    });
}
