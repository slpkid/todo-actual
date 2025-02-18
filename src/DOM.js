import { createElement, returnElementByID } from "./createElement"
import { TO_DO_LIBRARY as toDoLibrary } from "./todo-list";
import { parseListPos } from "./evalString";
import { List, Task } from "./todo-list";
import { parseStringFromLocalStorage as loadData, saveObjectToLocalStorage as saveData } from "./localStorage";

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
    const addButton = createElement('button','new',DOM_Node,['add-button'])

    addButton.addEventListener('click', e => {
        const queryItem = prompt('Create new list?')
        if (queryItem === 'yes') {
            if (queryItem === undefined||queryItem === null || queryItem === '') {
                return
            }
            listElement.appendTask(new List(prompt('Enter desired list name.')))
        } else {
            const name = prompt('Enter Task Name.')
            if (name === undefined||name === null || name === '') {
                return
            }
            const description = prompt('Enter Description.')
            const dueDate = prompt('Enter Due Date.')
            const priority = prompt('Choose Priority.')

            function nah(arg) {
                if (arg === undefined ||arg ===  null ||arg ===  '') {
                arg = 'N/A'
                }
                return arg
            }

            listElement.appendTask(new Task(name,nah(description),nah(dueDate),nah(priority)))
        }
        saveData(toDoLibrary)
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
        saveData(toDoLibrary)
    })
    
    return deleteButton
}

// creates a checkbox for tasks to be updated with their completion status
function checkBox(DOM_Node, listElement) {
    const checkBox = createElement('input','',DOM_Node,['checkbox'])
    // check to see if task has been completed, if yes then render as checked
    checkBox.type = 'checkbox'    
    if (listElement.isComplete === true) {
        checkBox.checked = true
    }
    if (listElement.isComplete === false) {
        checkBox.checked = false
    }
    // calls function to toggle completion status
    checkBox.addEventListener('click', e => {
        listElement.completeTask()
        saveData(toDoLibrary)
        unRenderDOM()
        renderToDo(toDoLibrary, TO_DO_DOM)
    })
}

//allows user to edit details
function editButton(DOM_Node, listElement, parent_DOM_Node) {
    const editButton = createElement('button','edit',DOM_Node,['edit-button'])
    const editArray = DOM_Node.querySelectorAll('.details')

    // place the button next to the element
    DOM_Node.before(editButton)
    
    // render each p element as an input
    let isEditing = false
    editButton.addEventListener('click', e => {
        // change text to "save" since we're editing now
        editButton.textContent = 'save'

        // setting the list to expanded in the object
        DOM_Node.querySelector('.show-details-button').textContent = '-'
        listElement.showDetails = true
        
        if (isEditing === false) {
            editArray.forEach ( e => {
                e.remove()
            })

            // createElement('p','Name: ',DOM_Node,['details'])
            parent_DOM_Node.querySelector('.name').style.display = 'none'
            
            // parent_DOM_Node.remove()
            // const name = createElement('input',`${listElement.name}`,'',['details','name'])
            const name = document.createElement('input')
            const checkbox = parent_DOM_Node.querySelector('.checkbox')
            name.textContent = listElement.name
            name.classList.add('details')
            name.classList.add('name')
            name.classList.add('edit-name')
            checkbox.before(name)
            name.value = listElement.name

            createElement('p','Description: ',DOM_Node,['details'])
            const description = createElement('input',`${listElement.description}`,DOM_Node,['details','description','edit'])
            description.value = listElement.description
            
            createElement('p','Complete By: ',DOM_Node,['details'])
            const dueDate = createElement('input',`${listElement.dueDate}`,DOM_Node,['details','due-date','edit'])
            dueDate.value = listElement.dueDate
            
            createElement('p','Priority: ',DOM_Node,['details'])
            const priority = createElement('select',`${listElement.priority}`,DOM_Node,['details','priority','edit'])
            priority.value = listElement.priority

            //create the drop down list for priority
            const low = createElement('option','low',priority)
            low.value = 'low'
            const normal = createElement('option','normal',priority)
            normal.value = 'normal'
            const high = createElement('option','high',priority)
            high.value = 'high'
            const urgent = createElement('option','urgent',priority)
            urgent.value = 'urgent'            
            createElement('p','Completion Status:',DOM_Node,['details'])
            let completionStatus
            if (listElement.isComplete === false) {
                completionStatus = 'Incomplete'
            } else {
                completionStatus = 'Completed!'
            }

            //create the drop down list for completion status
            const isComplete = createElement('select',`${completionStatus}`,DOM_Node,['details','completion','edit'])
            isComplete.setAttribute('list','complete-list')
            const completed = createElement('option','Completed!',isComplete)
            completed.value = 'Completed!'
            const incomplete = createElement('option','Incomplete',isComplete)
            incomplete.value = 'Incomplete'
            isComplete.value = completionStatus

            isEditing = true

            return
        } else if (isEditing === true) {
            const name = parent_DOM_Node.querySelector('.edit-name').value
            const description = DOM_Node.querySelector('.description').value
            const dueDate = DOM_Node.querySelector('.due-date').value
            const priority = DOM_Node.querySelector('.priority').value
            let isComplete
            if (DOM_Node.querySelector('.completion').value === 'Completed!') {
                isComplete = true
            }
            if (DOM_Node.querySelector('.completion').value === 'Incomplete'){
                isComplete = false
            }
            listElement.editDetails(name,description,dueDate,priority,isComplete)

            isEditing = false
            saveData(toDoLibrary)
            unRenderDOM()
            renderToDo(toDoLibrary, TO_DO_DOM)
        }
    })
}

// creates a button that edits the name of a list
function editListNameButton (DOM_Node, listElement) {
    // create the button and name elements
    const editListNameButton = createElement('button','edit name',DOM_Node,['edit-list-name-button'])
    const spanName = DOM_Node.querySelector('.name')

    let isEditingName = false

    editListNameButton.addEventListener('click', e => {
        if (isEditingName === false) {
            // change the edit text to "save"
            editListNameButton.textContent = 'save'
            // create the text input box
            const newNameInput = document.createElement('input')
            newNameInput.value = listElement.name
            newNameInput.classList.add('new-name-input')
            spanName.before(newNameInput)
            // hide the old name
            spanName.style.display = 'none'
            isEditingName = true
        } else if (isEditingName === true) {
            // get the new name value
            const newNameInput = DOM_Node.querySelector('.new-name-input')
            // invoke the edit method on the list
            listElement.editName(newNameInput.value)
            isEditingName = false
            // render
            saveData(toDoLibrary)
            unRenderDOM()
            renderToDo(toDoLibrary, TO_DO_DOM)
        }
    })
}

// shows or hides details about each list or task
function showDetailsButton(DOM_Node, listElement) {
    const details = createElement('p','details',DOM_Node,['details'])
    const detailsButton = createElement('button','+',details,['show-details-button'])

    // console.log(listElement.showDetails)

    if (listElement.description) {
        createElement('p','Description: ',details,['details'])
        const description = createElement('p',`${listElement.description}`,details,['details','description','edit'])
    }

    if (listElement.dueDate) {
        createElement('p','Complete By: ',details,['details'])
        const dueDate = createElement('p',`${listElement.dueDate}`,details,['details','due-date','edit'])
    }

    if (listElement.priority) {
        createElement('p','Priority: ',details,['details'])
        const priority = createElement('p',`${listElement.priority}`,details,['details','priority','edit'])
    }

    if (listElement.isComplete === false || listElement.isComplete === true) {
        let completionStatus
        if (listElement.isComplete === false) {
            completionStatus = 'Incomplete'
        } else {
            completionStatus = 'Completed!'
        }
        const isComplete = createElement('p',`${completionStatus}`,details,['details','completion','edit'])
    }

    const detailsArray = details.querySelectorAll('.details')
        
    detailsArray.forEach(e => {
        if (listElement.showDetails === false) {
            detailsButton.textContent = '+'
            e.style.display = 'none'
        } else if (listElement.showDetails === true){
            detailsButton.textContent = '-'
            e.style.display = ''
        }
    })
    
    detailsButton.addEventListener('click', e => {
        const hideArray = details.querySelectorAll('.details')
        if (listElement.showDetails === false) {
            detailsButton.textContent = '-'
            hideArray.forEach ( thing => {
                thing.style.display = ''
            })
            listElement.showDetails = true
            // save data to local storage
            saveData(toDoLibrary)
        } else if (listElement.showDetails === true) {
            detailsButton.textContent = '+'
            hideArray.forEach ( thing => {
                thing.style.display = 'none'
            })
            listElement.showDetails = false
            // save data to local storage
            saveData(toDoLibrary)
        }
    })
    
    editButton(details, listElement, DOM_Node)
    saveData(toDoLibrary)

    return detailsArray
}

//variables to control the moveButton functionality.
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
        // make an array of the task move buttons
        const taskMoveButtons = document.querySelectorAll('.taskMoveButton')
        // make array of the list move buttons
        const listMoveButtons = DOM_Node.querySelectorAll('.listMoveButton')
        
        // on the first call, set the chosen element as the moveTarget
        if (moveTarget === undefined) {
            moveTarget = i
            moveTargetParentList = parentListElement
            
            
            // hide taskMoveButtons
            taskMoveButtons.forEach(button => {
                button.style.display = 'none'
            })

            if (moveTargetParentList.contents[moveTarget]) {
    
                // hide listMoveButtons
                listMoveButtons.forEach(button => {
                    button.style.display = 'none'
                })
            }
            moveButton.style.display = ''
            moveButton.textContent = 'cancel'

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
                listMoveButtons.forEach(button => {
                    button.style.display = ''
                })
                moveButton.textContent = 'move'
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

            // save data to local storage
            saveData(toDoLibrary)

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

function hideButton(DOM_Node, listElement) {
    const hideButton = createElement('button','hide',DOM_Node,['hide-button'])
    let showList = listElement.showList

    if (showList === false) {
        hideButton.textContent = 'show'
    }

    hideButton.addEventListener('click', e => {
        const childrenArray = DOM_Node.querySelectorAll('.child')

        if (showList === false) {
            hideButton.textContent = 'hide'
            childrenArray.forEach (child => {
                child.style.display = ''
            })
            showList = true
            listElement.showList = true
        } else if (showList === true) {
            hideButton.textContent = 'show'
            childrenArray.forEach (child => {
                child.style.display = 'none'
            })
            showList = false
            listElement.showList = false
        }
        // save data to local storage
        saveData(toDoLibrary)
    })

    listElement.hasRenderedOnce = true
}

function upButton(DOM_Node, listElement, parentListElement, i) {
    const upButton = createElement('button','^',DOM_Node,['up-button'])

    upButton.addEventListener('click', e => {
        parentListElement.moveTaskUp(i)
        unRenderDOM()
        renderToDo(toDoLibrary, TO_DO_DOM)
        // save data to local storage
        saveData(toDoLibrary)
    })
}

function downButton(DOM_Node, listElement, parentListElement, i) {
    const downButton = createElement('button','v',DOM_Node,['down-button'])

    downButton.addEventListener('click', e => {
        parentListElement.moveTaskDown(i)
        unRenderDOM()
        renderToDo(toDoLibrary, TO_DO_DOM)
        // save data to local storage
        saveData(toDoLibrary)
    })
}

//List rendering function
function renderList(listName, parent_DOM_Node, id, listElement, parentListElement, i) {
    const list = createElement('ul','',parent_DOM_Node,['child'],id)

    addButton(list, listElement)

    // create a span that contains the name list's name
    const name = document.createElement('span')
    const add = list.querySelector('.add-button')
    name.textContent = listElement.name
    name.classList.add('name')
    add.before(name)
    
    deleteButton(list, parentListElement, i)
    moveButton(list, i, parentListElement, listElement)
    upButton(list,listElement,parentListElement, i)
    downButton(list,listElement,parentListElement, i)
    hideButton(list, listElement)
    editListNameButton(list, listElement)

    if (parentListElement.showList === false) {
        list.style.display = 'none'
    }
  
    return list
}

// Task rendering function
function renderTask(taskName, parent_DOM_Node, id, listElement, parentListElement, i) {
    const task = createElement('ul','',parent_DOM_Node,['child'],id)    
    
    checkBox(task, listElement)
    
    // create a span that contains the name task's name
    const name = document.createElement('span')
    const checkbox = task.querySelector('.checkbox')
    name.textContent = listElement.name
    name.classList.add('details')
    name.classList.add('name')
    checkbox.before(name)  
    
    deleteButton(task, parentListElement, i)
    moveButton(task, i, parentListElement, listElement)
    upButton(task,listElement,parentListElement, i)
    downButton(task,listElement,parentListElement, i)
    showDetailsButton(task, listElement)

    const hideButtonElement = task.querySelector('.hide-button')    
    
    if (parentListElement.showList === false) {
        task.style.display = 'none'
    }

    return task
}

function unRenderDOM() {
    while (TO_DO_DOM.firstChild) {
        TO_DO_DOM.firstChild.remove()
    }
}

export { renderToDo, TO_DO_DOM }