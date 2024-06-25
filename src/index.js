import { createTask as Task, toDoLibrary, appendTask, List} from "./todo-list";

const makeBed = new Task('Make Bed','clean your bed','6/23/2023','high')
const cleanDishes = new Task('Clean Dishes','','6/23/2023','high')
const washClothes = new Task('Wash Clothes','','6/23/2023','high')

const myChores = new List('Chores')
const lifeTasks = new List('Life Tasks')

appendTask(lifeTasks,toDoLibrary)
appendTask(myChores,lifeTasks.contents)
appendTask(makeBed,myChores.contents)
appendTask(cleanDishes,myChores.contents)
appendTask(washClothes,myChores.contents)

console.log(toDoLibrary)

lifeTasks.transferTask(0,toDoLibrary)

console.log(toDoLibrary)