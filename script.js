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

    tasks.push(taskText)

    saveTasks(tasks)

    renderTasks()

    taskInput.value = ""

}

function createTaskElement(text) {

    const li = document.createElement("li")
    li.classList.add("task-item")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("task-checkbox")

    const span = document.createElement("span")
    span.textContent = text
    span.classList.add("task-text")

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Remover"
    deleteButton.classList.add("delete-btn")

    checkbox.addEventListener("change", function () {

        span.classList.toggle("completed")

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

        const taskElement = createTaskElement(task)

        taskList.appendChild(taskElement)

    })

}

renderTasks()