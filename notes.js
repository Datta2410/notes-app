const fs = require('fs')
const chalk = require('chalk')

//the following functions helps in adding the note to the json file notes.json
const addNote = (title,body)=>{
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note)=>note.title === title )
        //returns true or false based on the condition ..if true the element is added to the 'duplicatenotes' variable
    const duplicateNote = notes.find((note)=>note.title === title )//find method will stop when it finds the first match

    if (duplicateNote.length === 0) {
        
    notes.push({// push is a array property ...like append in python.
        title: title,
        body:body,
    })


    saveNotes(notes)
    console.log(chalk.green.inverse('Note Added!'))
    }
    else {
        console.log(chalk.red.inverse('Note Title Taken'))
    }
}

const saveNotes = (notes)=>{//writes to the notes.json file
                            const dataJSON = JSON.stringify(notes) // converts arrays to json string
                            fs.writeFileSync('notes.json', dataJSON) //writes data to the notes.json file
 }


const loadNotes = ()=>{
// a try catch block is used as a fail safe... in case the notes.json file is missing from the directory, the catch block returns a empty array  
// this array can then be pushed with new values
    try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON=dataBuffer.toString()
    return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

const removeNote = (title)=>{
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note)=> note.title !== title)// all the  notes except the one which is to be deleted is stored in 'duplicateNotes'
                                                                            
    if(duplicateNotes.length === notes.length-1 ){
        saveNotes(duplicateNotes)
        console.log(chalk.inverse.green('Note removed successfully!'))
    }   
    else{
        console.log(chalk.inverse.red('Note not found!'))
    }
}  

const listNotes = ()=>{
    const notes= loadNotes()
    console.log(chalk.inverse.blue('Your Notes'))
   // console.log(notes)
   
    notes.forEach((n)=>console.log(chalk.inverse.green(n.title)))
    
    // this.guestList.forEach((guest)=> {
    //     console.log(guest + ' is attending ' + this.name)
}

const readNote = (title)=> {
    const notes = loadNotes()
    const toRead = notes.find((note)=>note.title===title)
    if(toRead){

        console.log(chalk.green.inverse.bold(toRead.title))
        console.log(chalk.green(toRead.body))
    }
    else{
        console.log(chalk.red.inverse("No Note Found"))
    }
}
module.exports = {
    
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote,
}