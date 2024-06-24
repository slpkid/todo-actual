
let toDoLibrary = []

const List = class List {
    constructor(name) {
        this.name = name,
        this.deleteTask = (taskNumber) => {
            this.contents.push(this.contents.splice(taskNumber, 1)[0]);
            this.contents.pop()
        },
        this.contents = []
    }
}

const deleteTask = (task) => {

}

const createTask = class Task {
    constructor(name,description,dueDate,priority) {
        this.name = name,
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

export { toDoLibrary, createTask, appendTask, List }