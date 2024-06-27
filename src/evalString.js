// with TO_DO_LIBRARY as the unchanging topmost level of the data, we can consistently use it to path our way deeper. 

// given a string of listpos0++0++0++1 we need to first transform it into this:
// TO_DO_LIBRARY.contents[0].contents[0].contents[1]

// use string conversion via the split string method with "++" as a delimiter
// let unparsedString =  'listpos0++0++0++1'
// let parsedString = unparsedString.split('++')
// // parsedString = ['listpos0', '0', '0', '1']
// parsedString[0] = parsedString[0].slice(7)
// // parsedString =  ['0', '0', '0', '1']
// TO_DO_LIBRARY.contents[parsedString[0]]

function parseListPos(listPos) {
    let parsedString = listPos.split('++')
    parsedString[0] = parsedString[0].slice(7)
    let path = 'toDoLibrary'
    let i = 0
    while (i < parsedString.length) {
        path += `.contents[${parsedString[i]}]`
        i++
    }
    return path
}

export { parseListPos }
