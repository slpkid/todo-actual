import { createTask as Task, toDoLibrary, List} from "./todo-list";
import { renderToDo, TO_DO_LIST } from "./DOM";
import { createElement } from "./createElement";

const makeBed = new Task('Make Bed','clean your bed','6/23/2023','high')
const cleanDishes = new Task('Clean Dishes','','6/23/2023','high')
const washClothes = new Task('Wash Clothes','','6/23/2023','high')

const myChores = new List('Chores')
const lifeTasks = new List('Life Tasks')

toDoLibrary.appendTask(lifeTasks)
lifeTasks.appendTask(myChores)
myChores.appendTask(makeBed)
myChores.appendTask(cleanDishes)
myChores.appendTask(washClothes)

console.log(toDoLibrary)


console.log(toDoLibrary)

const driveToWork = new Task('Drive to Work','','6/24/2024','high')
lifeTasks.appendTask(driveToWork)
console.log(toDoLibrary)

console.log(toDoLibrary.contents[0].contents[1])

renderToDo(toDoLibrary, TO_DO_LIST)

// createElement('li',toDoLibrary.contents[0].contents[1].name, TO_DO_LIST)