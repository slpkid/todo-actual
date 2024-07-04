const createElement = (element,content,parent,htmlClass,htmlID) => {
    const newElement = document.createElement(`${element}`)
    newElement.innerText = content
    if(htmlClass){
        htmlClass.forEach(element => {
            newElement.classList.add(element)
        });
    }
    if(htmlID) {newElement.setAttribute('id',htmlID)}
    parent.appendChild(newElement)
    return newElement
}

const returnElementByID = (htmlID) => {
    const element = document.getElementById(`${htmlID}`)
    return element
}

export { createElement, returnElementByID }