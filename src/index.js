import { createTask as Task, TO_DO_LIBRARY as toDoLibrary, List} from "./todo-list";
import { renderToDo, TO_DO_DOM } from "./DOM";

const makeBed = new Task('Make Bed','clean your bed','6/23/2023','high')
const cleanDishes = new Task('Clean Dishes','','6/23/2023','high')
const washClothes = new Task('Wash Clothes','','6/23/2023','high')
const driveToWork = new Task('Drive to Work','','6/24/2024','high')
const ironClothes = new Task('Iron Clothes','','6/23/2023','high')
const goToLunch = new Task('Go to Lunch','','6/23/2023','high')
const submitReports = new Task('Submit Reports','','6/23/2023','high')
const clockOut = new Task('Clock Out','','6/23/2023','high')

const myChores = new List('Chores')
const lifeTasks = new List('Life Tasks')
const workTasks = new List('Work Tasks')

toDoLibrary.appendTask(lifeTasks)
lifeTasks.appendTask(myChores)
lifeTasks.appendTask(driveToWork)
myChores.appendTask(makeBed)
myChores.appendTask(cleanDishes)
myChores.appendTask(washClothes)
lifeTasks.appendTask(ironClothes)
toDoLibrary.appendTask(workTasks)
workTasks.appendTask(goToLunch)
workTasks.appendTask(submitReports)
workTasks.appendTask(clockOut)


console.log(toDoLibrary)
const firstGuy = toDoLibrary

const guy = eval(`firstGuy.contents[0].contents[0].contents[0]`)

const otherGuy = toDoLibrary.contents[0].contents[0].contents[0]

console.log(guy)

// console.log(newGuy)

console.log(otherGuy)

renderToDo(toDoLibrary, TO_DO_DOM)

// createElement('li',TO_DO_LIBRARY.contents[0].contents[1].name, TO_DO_LIST)