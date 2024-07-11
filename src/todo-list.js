

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
        },
        this.editName = (newName) => {
            this.name = newName
        },
        this.editTask = (taskNumber, name, description, dueDate, priority, isComplete) => {
            this.contents[taskNumber].editDetails(name, description, dueDate, priority, isComplete)
        },
        this.showList = true,
        this.hasRenderedOnce = false,
        this.type = 'list'
    }
}

const Task = class Task {
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
        },
        this.editDetails = (name, description, dueDate, priority,isComplete) => {
            this.name = name,
            this.description = description,
            this.dueDate = dueDate,
            this.priority = priority,
            this.isComplete = isComplete
        },
        this.showDetails = false,
        this.type = 'task'
    }
}

function addListFunctions (obj) {
    obj.deleteTask = function(taskNumber) {
        obj.contents.push(obj.contents.splice(taskNumber, 1)[0]);
        obj.contents.pop()
    },
    obj.transferTask = (taskNumber,newList) => {
        newList.contents.push(obj.contents[taskNumber]);
        obj.deleteTask(taskNumber);
        obj.isOpened = true
    },
    obj.appendTask = (task) => {
        obj.contents.push(task)
        obj.isOpened = true
    },
    obj.editName = (newName) => {
        obj.name = newName
    },
    obj.editTask = (taskNumber, name, description, dueDate, priority, isComplete) => {
        obj.contents[taskNumber].editDetails(name, description, dueDate, priority, isComplete)
    }
    return obj
}

function addTaskFunctions (obj) {
    obj.completeTask = () => {
        if (obj.isComplete == false) {
            obj.isComplete = true
        } else {
        if (obj.isComplete == true) {
            obj.isComplete = false
        }}
    },
    obj.editDetails = (name, description, dueDate, priority,isComplete) => {
        obj.name = name,
        obj.description = description,
        obj.dueDate = dueDate,
        obj.priority = priority,
        obj.isComplete = isComplete
    }
    return obj
}

function addFunctionsToList(list) {
    
}

let TO_DO_LIBRARY = new List('ToDo')

export { TO_DO_LIBRARY, Task, List, addListFunctions, addTaskFunctions }