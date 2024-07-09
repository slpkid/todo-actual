import { createTask as Task, TO_DO_LIBRARY as toDoLibrary, List} from "./todo-list";
import { renderToDo, TO_DO_DOM } from "./DOM";

const makeBed = new Task('Make Bed','clean your bed','6/23/2023','high')
const cleanDishes = new Task('Clean Dishes','Load dishes into dishwasher and run the load.','6/23/2023','high')
const washClothes = new Task('Wash Clothes','Load washing machine and run a cycle','6/23/2023','high')
const driveToWork = new Task('Drive to Work','Get in your car and drive down the freeway','6/24/2024','high')
const ironClothes = new Task('Iron Clothes','Iron three shirts','6/23/2023','high')
const goToLunch = new Task('Go to Lunch','Eat lunch at Drafty\'s Burgers','6/23/2023','high')
const submitReports = new Task('Submit Reports','submit the reports by three o\'clock','6/23/2023','high')
const clockOut = new Task('Clock Out','Go home','6/23/2023','high')

const myChores = new List('Chores')
const lifeTasks = new List('Life Tasks')
const workTasks = new List('Work Tasks')

const miscTask1 = new Task('Eat Second Breakfast','','6/23/2023','high')
const miscTask2 = new Task('Eat Afternoon Snack','','6/23/2023','high')

toDoLibrary.appendTask(lifeTasks)
lifeTasks.appendTask(myChores)
lifeTasks.appendTask(driveToWork)
myChores.appendTask(makeBed)
myChores.appendTask(cleanDishes)
myChores.appendTask(washClothes)
lifeTasks.appendTask(ironClothes)
toDoLibrary.appendTask(miscTask1)
toDoLibrary.appendTask(miscTask2)
toDoLibrary.appendTask(workTasks)
workTasks.appendTask(goToLunch)
workTasks.appendTask(submitReports)
workTasks.appendTask(clockOut)

miscTask1.editDetails('Don\'t eat second breakfast','','7/23/2024','low',false)

myChores.editName('Boring Chores')

toDoLibrary.editTask(2, 'Don\'t eat afternoon snack','','2/23/7272','medium',false)

renderToDo(toDoLibrary, TO_DO_DOM)