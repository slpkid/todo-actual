import { createElement, returnElementByID } from "./createElement"
import { TO_DO_LIBRARY as toDoLibrary } from "./todo-list";
import { parseListPos } from "./evalString";

const TO_DO_DOM = document.getElementById('to-do-library')

function renderToDo(toDo, parent, j = 0, weehoo = [], firstRan = false) {

    // this runs once to render the name of the parent to do list     
    const firstRun = (() => {
        if (firstRan == false) {
        const el = createElement('ul',toDo.name,parent)
        parent = el
        addButton(el)
        }
        firstRan = true
    })();
    
    
        let i = 0
        
        toDo.contents.forEach(element => {
            weehoo[j] = i
            const listPos = `listPos${weehoo.join('++')}`
            let parentList = toDo
            if (!element.contents) {
                renderTask(element.name,parent,listPos, element, parentList, i)
            } else {
                const el = renderList(element.name,parent,listPos, element, parentList, i)
                renderToDo(element, el, j+1,weehoo, parentList)
                weehoo.pop()
            }
            i++
        })
}

// creates a button to create new tasks or lists 
function addButton(parent) {
    const addButton = createElement('button','+',parent)

    addButton.addEventListener('click', e => {
        console.log('add something')
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
function showDetailsButton() {

}

// allows user to rearrange tasks and lists
function moveButton() {

}

function hideButton(parent) {
    const hideButton = createElement('button','hide',parent)
    hideButton.addEventListener('click', e => {
      const children = parent.querySelectorAll('.child')
      children.forEach( child => {
        if (!child.style.display) {
          child.style.display = 'none'
        } else if (child.style.display = 'none') {
            child.style.display= ''
        }
      })
    })
}

//List rendering function
function renderList(listName, parent, id, element, parentList, i) {
    const list = createElement('ul',listName,parent,['child'],id)

    hideButton(list)
    deleteButton(list, parentList, i)

    return list
}

// Task rendering function
function renderTask(taskName, parent, id, element, parentList, i) {
    const task = createElement('li',taskName,parent,['child'],id)
    
    deleteButton(task, parentList, i)
    checkBox(task, element)

    return task
}

function unRenderDOM() {
    while (TO_DO_DOM.firstChild) {
        TO_DO_DOM.firstChild.remove()
    }
}

export { renderToDo, TO_DO_DOM }