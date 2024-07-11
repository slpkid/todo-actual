import { List, Task } from "./todo-list";

// this function reads the parsed JSON and invokes List and Task constructors and appends them to toDoLibrary
function parseNewList (parsedJSON, newListElement) {

    parsedJSON.contents.forEach(element => {
    
        if (element.type === 'list') {
            // create List
            const list = new List (element.name)

            //copy over any other list attributes
            list.showList = element.showList
            list.hasRenderedOnce = element.showList
            // add it to the new library
            newListElement.appendTask(list)
            // since it's a list, recurse and run the function again on its contents to append its children and so on
            parseNewList(element,list)
        } else if (element.type === 'task') {
            // create the task
            const task = new Task(element.name,element.description,element.dueDate,element.priority)

            //copy over other task attributes
            task.isComplete = element.isComplete
            task.showDetails = element.showDetails

            // add it to the library...
            newListElement.appendTask(task)
        }
    });
}

export { parseNewList }