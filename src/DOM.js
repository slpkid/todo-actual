import { createElement, returnElementByID } from "./createElement"
import { TO_DO_LIBRARY as toDoLibrary } from "./todo-list";
import { parseListPos } from "./evalString";
import { List, createTask as Task } from "./todo-list";

const TO_DO_DOM = document.getElementById('to-do-library')

function renderToDo(listElement, parent_DOM_Node, j = 0, idArray = [], firstRan = false) {
    let i = 0

    // this runs once to render the name of the parent to do list     
    const firstRun = (() => {
        if (firstRan == false) {
        const DOM_TO_DO_ELEMENT = createElement('ul',listElement.name,parent_DOM_Node)
        parent_DOM_Node = DOM_TO_DO_ELEMENT
        addButton(DOM_TO_DO_ELEMENT, listElement)
        }
        firstRan = true
    })();
        
    listElement.contents.forEach(element => {
        idArray[j] = i
        const listPos = `listPos${idArray.join('++')}`
        let parentList = listElement
        if (!element.contents) {
            renderTask(element.name, parent_DOM_Node, listPos, element, parentList, i)
        } else {
            const el = renderList(element.name, parent_DOM_Node, listPos, element, parentList, i)
            renderToDo(element, el, j + 1, idArray, parentList)
            idArray.pop()
        }
        i++
    })
}

// creates a button to create new tasks or lists 
function addButton(DOM_Node, listElement) {
    const addButton = createElement('button','+',DOM_Node)

    addButton.addEventListener('click', e => {
        const queryItem = prompt('Create new list?')
        if (queryItem === 'yes') {
            listElement.appendTask(new List(prompt('Enter desired list name.')))
            console.log(toDoLibrary)
        } else {
            listElement.appendTask(new Task(
                prompt('Enter Task Name.'),
                prompt('Enter Description.'),
                prompt('Enter Due Date.'),
                prompt('Choose Priority.')
            ))
        }
        unRenderDOM()
        renderToDo(toDoLibrary, TO_DO_DOM)
    })

    return addButton
}

// creates a delete button to delete a task or list
function deleteButton(DOM_Node, parentListElement, i) {
    const deleteButton = createElement('button','x',DOM_Node)
    deleteButton.addEventListener('click', e => {
        //executes method off of parent object to delete requested item
        parentListElement.deleteTask(i)
        // clear DOM, then render
        unRenderDOM()
        renderToDo(toDoLibrary, TO_DO_DOM)
    })
    return deleteButton
}

// creates a checkbox for tasks to be updated with their completion status
function checkBox(DOM_Node, listElement) {
    const checkBox = createElement('input','',DOM_Node)
    // check to see if task has been completed, if yes then render as checked
    checkBox.type = 'checkbox'    
    if (listElement.isComplete == true) {
        checkBox.checked = true
    }
    // calls function to toggle completion status
    checkBox.addEventListener('click', e => {
        listElement.completeTask()
        unRenderDOM()
        renderToDo(toDoLibrary, TO_DO_DOM)
    })
}

//allows user to edit details
function editButton(DOM_Node, listElement) {
    
}

// shows or hides details about each list or task
function showDetailsButton(DOM_Node, listElement) {
    const details = createElement('p','details',DOM_Node)
    const detailsButton = createElement('button','+',details)
    let showDetails = false
    let detailsArray = []

    if (listElement.description) {
        const description = createElement('p',`Description: ${listElement.description}`,details)
        detailsArray.push(description)
    }

    if (listElement.dueDate) {
        const dueDate = createElement('p',`Complete By: ${listElement.dueDate}`,details)
        detailsArray.push(dueDate)
    }

    if (listElement.priority) {
        const priority = createElement('p',`Priority: ${listElement.priority}`,details)
        detailsArray.push(priority)
    }

    if (listElement.isComplete === false || listElement.isComplete === true) {
        let completionStatus
        if (listElement.isComplete === false) {
            completionStatus = 'Incomplete'
        } else {
            completionStatus = 'Completed!'
        }
        const isComplete = createElement('p',`${completionStatus}`,details)
        detailsArray.push(isComplete)
    }

    detailsArray.forEach ( e => {
        e.style.display = 'none'
    })

    detailsButton.addEventListener('click', e => {
        if (showDetails === false) {
            detailsButton.textContent = '-'
            showDetails = true
            detailsArray.forEach ( e => {
                e.style.display = ''
            })
        } else {
            detailsButton.textContent = '+'
            showDetails = false
            detailsArray.forEach ( e => {
                e.style.display = 'none'
            })
        }
    })

    return detailsArray
}

let moveTarget
let moveTargetParentList
let moveTargetDestination

// allows user to rearrange tasks and lists
function moveButton(DOM_Node, i, parentListElement, element) {
    let listOrTask
    // check to see if the chosen element is a list and assign appropriate class
    if (element.contents) {
        listOrTask = 'listMoveButton'
    } else {
        listOrTask = 'taskMoveButton'
    }
    const moveButton = createElement('button', 'move', DOM_Node,[`${listOrTask}`])
    moveButton.addEventListener('click', e => {
        // make an array of the 
        const taskMoveButtons = document.querySelectorAll('.taskMoveButton')

        // on the first call, set the chosen element as the moveTarget
        if (moveTarget === undefined) {
            moveTarget = i
            moveTargetParentList = parentListElement
            
            // hide taskMoveButtons
            taskMoveButtons.forEach(button => {
                button.style.display = 'none'
            })

            return
        } else {
            // on the second call, set the chosen element as the destination
            moveTargetDestination = element
            if (moveTargetParentList.contents[moveTarget] === moveTargetDestination ) {// bug: if it tries to move into its own chiildren, it will do so and then delete itself)
                // reinitialize variables and unhide taskMoveButtons
                moveTarget = undefined
                moveTargetParentList = undefined
                moveTargetDestination = undefined
                taskMoveButtons.forEach(button => {
                    button.style.display = ''
                })
            }
            // check to see if the destination target lies within the contents of moveTarget 
            let targetIsChildList = false
            if (moveTargetParentList.contents[moveTarget].contents) { 

                function targetIsChildListFunc(list) {
                    list.contents.forEach ( e => {
                        if (e === element) {
                            targetIsChildList = true
                            return
                        }
                        console.log(e)
                        if (e.contents) {
                            targetIsChildListFunc(e)
                        }
                    })
                }

                targetIsChildListFunc(moveTargetParentList.contents[moveTarget])

            } 
            // transfer the moveTarget to its destination
            if (targetIsChildList === false) {
                moveTargetParentList.transferTask(moveTarget,moveTargetDestination)
            }

            // render DOM
            unRenderDOM()
            renderToDo(toDoLibrary, TO_DO_DOM)

            // reinitialize variables and unhide taskMoveButtons
            moveTarget = undefined
            moveTargetParentList = undefined
            moveTargetDestination = undefined
            taskMoveButtons.forEach(button => {
                button.style.display = ''
            })
        }
    })
}

function hideButton(DOM_Node) {
    const hideButton = createElement('button','hide',DOM_Node)
    hideButton.addEventListener('click', e => {
      const children = DOM_Node.querySelectorAll('.child')
      children.forEach( child => {
        if (!child.style.display) {
          child.style.display = 'none'
          hideButton.textContent = 'show'
        } else if (child.style.display = 'none') {
            child.style.display= ''
            hideButton.textContent = 'hide'
        }
      })
    })
}

//List rendering function
function renderList(listName, parent_DOM_Node, id, listElement, parentListElement, i) {
    const list = createElement('ul',listName,parent_DOM_Node,['child'],id)

    addButton(list, listElement)
    deleteButton(list, parentListElement, i)
    moveButton(list, i, parentListElement, listElement)
    hideButton(list)
    
    return list
}

// Task rendering function
function renderTask(taskName, parent_DOM_Node, id, listElement, parentListElement, i) {
    const task = createElement('ul',taskName,parent_DOM_Node,['child'],id)

    
    checkBox(task, listElement)
    deleteButton(task, parentListElement, i)
    moveButton(task, i, parentListElement, listElement)
    hideButton(task)
    showDetailsButton(task, listElement)
    editButton()
    
    // const details = createElement('p',
    // `${element.description}`,task,['child'])


    return task
}

function unRenderDOM() {
    while (TO_DO_DOM.firstChild) {
        TO_DO_DOM.firstChild.remove()
    }
}

export { renderToDo, TO_DO_DOM }