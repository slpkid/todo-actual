let array1 = {}
let array2 = {}


let nestedArray1 = {}

nestedArray1 = {
    name: 'nestedArray1',
    contents: [8,9,10]
}

array3 = {
    name: 'array3',
    contents: [1,2,3]
}

array2 = {
    name: 'array2',
    contents: [nestedArray1,1,2]
}

array1 = {
    name: 'array1',
    contents: [array2,3,4,array3]
}

let wonton = {
    "name": "ToDo",
    "contents": [
        {
            "name": "Life Tasks",
            "contents": [
                {
                    "name": "Chores",
                    "contents": [
                        {
                            "name": "Make Bed",
                            "description": "clean your bed",
                            "dueDate": "6/23/2023",
                            "priority": "high",
                            "isComplete": false
                        },
                        {
                            "name": "Clean Dishes",
                            "description": "",
                            "dueDate": "6/23/2023",
                            "priority": "high",
                            "isComplete": false
                        },
                        {
                            "name": "Wash Clothes",
                            "description": "",
                            "dueDate": "6/23/2023",
                            "priority": "high",
                            "isComplete": false
                        }
                    ]
                },
                {
                    "name": "Drive to Work",
                    "description": "",
                    "dueDate": "6/24/2024",
                    "priority": "high",
                    "isComplete": false
                },
                {
                    "name": "Iron Clothes",
                    "description": "",
                    "dueDate": "6/23/2023",
                    "priority": "high",
                    "isComplete": false
                }
            ]
        },
        {
            "name": "Work Tasks",
            "contents": [
                {
                    "name": "Go to Lunch",
                    "description": "",
                    "dueDate": "6/23/2023",
                    "priority": "high",
                    "isComplete": false
                },
                {
                    "name": "Submit Reports",
                    "description": "",
                    "dueDate": "6/23/2023",
                    "priority": "high",
                    "isComplete": false
                },
                {
                    "name": "Clock Out",
                    "description": "",
                    "dueDate": "6/23/2023",
                    "priority": "high",
                    "isComplete": false
                }
            ]
        }
    ]
}



function renderEach(array, j = 0, weehoo = []) {
    let i = 0
    
    array.contents.forEach(element => {
        weehoo[j] = i
        console.log(`listPos${weehoo.join('++')}`)
        i++
        if (element.contents) {
            renderEach(element, j+1,weehoo)
            weehoo.pop()
        }
    });
}
renderEach(wonton)

