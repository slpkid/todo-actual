import { createElement, returnElementByID } from "./createElement"
import { toDoLibrary } from "./todo-list";

const TO_DO_LIST = document.getElementById('to-do-library')

function renderToDo(toDo, parent) {
    // this runs once to render the name of the list itself
    const firstRun = (() => {
        const el = createElement('ul',toDo.name,parent)
        parent = el
    })();

    function renderContents (toDo, parent) {
        //cycles through the contents of each list element
        toDo.contents.forEach(element => {
            //if it detects another list, it will render a list then recurse the function
            if (element.contents) {
                const el = createElement('ul',element.name,parent)
                renderContents(element, el)
            }
            //if it detects a task, it will render a task
            if (!element.contents) {
                createElement('li',element.name,parent)
            }
        });
    }
    renderContents(toDo, parent)

}



export { renderToDo, TO_DO_LIST }