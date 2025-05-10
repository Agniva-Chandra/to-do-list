function updateProgress() {
    const totalTasks = document.querySelectorAll('li').length;
    const completedTasks = document.querySelectorAll('li .completed').length;
    const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    
    document.querySelector('.progress-circle').style.setProperty('--progress', percentage + '%');
    document.getElementById('progress-percentage').textContent = percentage + '%';
}

function completeTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskText = taskItem.querySelector('.task-text');
    taskText.classList.toggle('completed');
    button.textContent = taskText.classList.contains('completed') ? 'Undo' : 'Complete';
    updateProgress();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        <div class="button-container">
            <button class="complete-btn" onclick="completeTask(this)">Complete</button>
            <button class="delete-btn" onclick="deleteTask(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 100 100">
                    <path fill="currentColor" d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"></path>
                    <path fill="currentColor" d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38z"></path>
                </svg>
            </button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = '';
    updateProgress();
}

function deleteTask(button) {
    button.closest('li').remove();
    updateProgress();
}

// Add ability to press Enter to add task
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});