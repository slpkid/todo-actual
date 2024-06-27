import { createElement, returnElementByID } from "./createElement"
import { TO_DO_LIBRARY } from "./todo-list";
import { parseListPos } from "./evalString";

const TO_DO_DOM = document.getElementById('to-do-library')

function renderToDo(toDo, parent, j = 0, weehoo = []) {
    // this runs once to render the name of the list itself
    const firstRun = (() => {
        const el = createElement('ul',toDo.name,parent)
        parent = el
    })();

        let i = 0
        
        toDo.contents.forEach(element => {
            weehoo[j] = i
            const listPos = `listPos${weehoo.join('++')}`
            console.log(list)
            console.log(parseListPos(listPos))
            if (!element.contents) {
                renderTask(element.name,parent,listPos)
            } else {
                const el = renderList(element.name,parent,listPos)
                renderToDo(element, el, j+1,weehoo)
                weehoo.pop()
            }
            i++
        })
}



function renderList(listName, parent, id) {
    const list = createElement('ul',listName,parent,'',id)

    const hideButton = createElement('button','hide',list)

    hideButton.addEventListener('click', e => {
        console.log('hide contents!')
        console.log(list)
    })

    return list
}

function renderTask(taskName, parent, id) {
    
    const task = createElement('li',taskName,parent,'',id)

    const deleteButton = createElement('button','x',task)
    const checkBox = createElement('input','',task)
    checkBox.type = 'checkbox'

    deleteButton.addEventListener('click', e => {
        console.log('delete!')
        console.log(task)
    })

    checkBox.addEventListener('click', e => {
        console.log('checkbox!')
        console.log(task)
    })

    return task
}


// [0]ToDo
// 	[0] Life Taskshide
// 		[0] Choreshide
// 			[0] Make Bedx
// 			[1] Clean Dishesx
// 			[2] Wash Clothesx
// 	[1] Drive to Workx

// Make Bed id = listpos0++0++0++1 
// drive to work id = listpos0++1

// listpos is a proprietary keyword
// number signifies the position in the array
// ++ signifies depth

// how to apply this to the rendering function?

// initialize a variable to store the position
// on detection of array, copy over the current id string and push ++ to the end of the string
// this way we save the high level depth and position and delete the deeper ones once we exit the array
// let currID = 'listpos'
// let currPos increase every time an element is created

// how to parse the string so that the DOM can affect the data?

// eval

export { renderToDo, TO_DO_DOM }