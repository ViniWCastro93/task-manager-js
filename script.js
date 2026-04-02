const taskInput = document.getElementById("taskInput")
const addTaskBtn = document.getElementById("addTaskBtn")
const taskList = document.getElementById("taskList")

addTaskBtn.addEventListener("click", addTask)

function addTask() {

    const taskText = taskInput.value.trim()

    if (taskText === "") {
        return
    }

    const tasks = getTasks()

    tasks.push({
    text: taskText,
    completed: false
})

    saveTasks(tasks)

    renderTasks()

    taskInput.value = ""

}

function createTaskElement(text, completed) {

    const li = document.createElement("li")
    li.classList.add("task-item")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = completed
    checkbox.classList.add("task-checkbox")

    const span = document.createElement("span")
    span.textContent = text
    span.classList.add("task-text")

    if (completed) {
        span.classList.add("completed")
}

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Remover"
    deleteButton.classList.add("delete-btn")

    checkbox.addEventListener("change", function () {

    const tasks = getTasks()

    const updatedTasks = tasks.map(function(task) {

        if (task.text === text) {
            return {
                text: task.text,
                completed: checkbox.checked
            }
        }

        return task

    })

    saveTasks(updatedTasks)

    renderTasks()

})
    deleteButton.addEventListener("click", function () {

    const tasks = getTasks()

    const updatedTasks = tasks.filter(function(task) {
        return task !== text
    })

    saveTasks(updatedTasks)

    renderTasks()

})

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(deleteButton)

    return li
}

taskInput.addEventListener("keydown", handleInputKeydown)

function handleInputKeydown(event) {

    if (event.key === "Enter") {
        addTask()
    }

}

function saveTasks(tasks) {

    localStorage.setItem("tasks", JSON.stringify(tasks))

}

function getTasks() {

    const tasks = localStorage.getItem("tasks")

    if (tasks) {
        return JSON.parse(tasks)
    }

    return []

}

function renderTasks() {

    const tasks = getTasks()

    taskList.innerHTML = ""

    tasks.forEach(function(task) {

    const taskElement = createTaskElement(task.text, task.completed)

    taskList.appendChild(taskElement)

})

}

renderTasks()