import { createElement, returnElementByID } from "./createElement"
import { TO_DO_LIBRARY as toDoLibrary } from "./todo-list";
import { parseListPos } from "./evalString";
import { List, createTask as Task } from "./todo-list";

const TO_DO_DOM = document.getElementById('to-do-library')

function renderToDo(toDo, parent, j = 0, weehoo = [], firstRan = false) {
    let i = 0

    // this runs once to render the name of the parent to do list     
    const firstRun = (() => {
        if (firstRan == false) {
        const el = createElement('ul',toDo.name,parent)
        parent = el
        addButton(el, toDo)
        }
        firstRan = true
    })();
        
    toDo.contents.forEach(element => {
        weehoo[j] = i
        const listPos = `listPos${weehoo.join('++')}`
        let parentList = toDo
        if (!element.contents) {
            renderTask(element.name, parent, listPos, element, parentList, i)
        } else {
            const el = renderList(element.name, parent, listPos, element, parentList, i)
            renderToDo(element, el, j + 1, weehoo, parentList)
            weehoo.pop()
        }
        i++
    })
}

// creates a button to create new tasks or lists 
function addButton(parent, element) {
    const addButton = createElement('button','+',parent)

    addButton.addEventListener('click', e => {
        const queryItem = prompt('Create new list?')
        if (queryItem === 'yes') {
            element.appendTask(new List(prompt('Enter desired list name.')))
            console.log(toDoLibrary)
        } else {
            element.appendTask(new Task(
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
function deleteButton(parent, parentList, i) {
    const deleteButton = createElement('button','x',parent)
    deleteButton.addEventListener('click', e => {
        //executes method off of parent object to delete requested item
        parentList.deleteTask(i)
        // clear DOM, then render
        unRenderDOM()
        renderToDo(toDoLibrary, TO_DO_DOM)
    })
    return deleteButton
}

// creates a checkbox for tasks to be updated with their completion status
function checkBox(task, element) {
    const checkBox = createElement('input','',task)
    // check to see if task has been completed, if yes then render as checked
    checkBox.type = 'checkbox'    
    if (element.isComplete == true) {
        checkBox.checked = true
    }
    // calls function to toggle completion status
    checkBox.addEventListener('click', e => {
        element.completeTask()
    })
}

//allows user to edit details
function editButton() {

}

// shows or hides details about each list or task
function showDetailsButton(DOM_Node, listElement) {
    const details = createElement('p','details',DOM_Node)
    const detailsButton = createElement('button','+',details)
    let showDetails = false
    let detailsArray = []

    if (listElement.description) {
        const description = createElement('p',`${listElement.description}`,details)
        detailsArray.push(description)
    }

    if (listElement.dueDate) {
        const dueDate = createElement('p',`${listElement.dueDate}`,details)
        detailsArray.push(dueDate)
    }

    if (listElement.priority) {
        const priority = createElement('p',`${listElement.priority}`,details)
        detailsArray.push(priority)
    }

    if (listElement.isComplete) {
        const isComplete = createElement('p',`${listElement.isComplete}`,details)
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

function hideButton(parent) {
    const hideButton = createElement('button','hide',parent)
    hideButton.addEventListener('click', e => {
      const children = parent.querySelectorAll('.child')
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
function renderList(listName, parent, id, listElement, parentList, i) {
    const list = createElement('ul',listName,parent,['child'],id)

    addButton(list, listElement)
    deleteButton(list, parentList, i)
    moveButton(list, i, parentList, listElement)
    hideButton(list)
    
    return list
}

// Task rendering function
function renderTask(taskName, parent, id, listElement, parentList, i) {
    const task = createElement('ul',taskName,parent,['child'],id)

    
    checkBox(task, listElement)
    deleteButton(task, parentList, i)
    moveButton(task, i, parentList, listElement)
    hideButton(task)
    showDetailsButton(task, listElement)
    
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