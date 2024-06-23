
let toDoLibrary = []

const createProject = (projectName) => {
    const newProject = projectName
}

const createTask = class Task {
    constructor(title,description,dueDate,priority) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.isComplete = false,
        this.completeTask = () => {
            this.isComplete = true
        }
    }
}

const appendTask = (task,parent) => {
    parent.push(task)
}



export { toDoLibrary, createTask, appendTask }