import { createTask, toDoLibrary, appendTask} from "./todo-list";



appendTask(new createTask('Make Bed','clean your bed','6/23/2023','high'),toDoLibrary)
appendTask(new createTask('Clean Dishes','','6/23/2023','high'),toDoLibrary)
appendTask(new createTask('Wash Clothes','','6/23/2023','high'),toDoLibrary)



toDoLibrary[0].completeTask()


toDoLibrary[1].completeTask()

toDoLibrary[2].completeTask()

console.log(toDoLibrary)