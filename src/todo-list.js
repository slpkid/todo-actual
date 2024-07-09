

const List = class List {
    constructor(name) {
        this.name = name,
        this.deleteTask = (taskNumber) => {
            this.contents.push(this.contents.splice(taskNumber, 1)[0]);
            this.contents.pop()
        },
        this.contents = [],
        // allows user to organize tasks and lists after appending them.
        this.transferTask = (taskNumber,newList) => {
            newList.contents.push(this.contents[taskNumber]);
            this.deleteTask(taskNumber);
            this.isOpened = true
        },
        this.appendTask = (task) => {
            this.contents.push(task)
            this.isOpened = true
        }
        this.editName = (newName) => {
            this.name = newName
        }
        this.editTask = (taskNumber, name, description, dueDate, priority, isComplete) => {
            this.contents[taskNumber].editDetails(name, description, dueDate, priority, isComplete)
        }
        this.showList = true,
        this.hasRenderedOnce = false
    }
}

const createTask = class Task {
    constructor(name,description,dueDate,priority) {
        this.name = name,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.isComplete = false,
        this.completeTask = () => {
            if (this.isComplete == false) {
                this.isComplete = true
            } else {
            if (this.isComplete == true) {
                this.isComplete = false
            }}
        }
        this.editDetails = (name, description, dueDate, priority,isComplete) => {
            this.name = name,
            this.description = description,
            this.dueDate = dueDate,
            this.priority = priority,
            this.isComplete = isComplete
        },
        this.showDetails = false
    }
}

let TO_DO_LIBRARY = new List('ToDo')

export { TO_DO_LIBRARY, createTask, List }