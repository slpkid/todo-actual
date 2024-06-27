

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
        },
        this.appendTask = (task) => {
            this.contents.push(task)
        }
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
            this.isComplete = true
        }
    }
}

let TO_DO_LIBRARY = new List('ToDo')

export { TO_DO_LIBRARY, createTask, List }