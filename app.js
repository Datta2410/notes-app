
//these lines are like import commands in pyhton per say.

// const validator=require('validator')
const notes=require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')
// const Message=getNotes()

// console.log(Message)
// console.log(chalk.blue.inverse.bold('Success!'))
// console.log(validator.isEmail('gmail.com'))
// console.log(validator.isURL('gmail.com'))
//const command = process.argv[2]
/*
if (command === 'add'){
    console.log('Adding note:')
}

else if(command === 'remove'){
    console.log('removing note')
}
*/
//console.log(process.argv)
// customize yargs version
yargs.version('1.1.0')
yargs.command({  // yargs.command lets u define a command,  in this case it is add. every command has a name, description(optional but recommended), handler properties. 
    command:'add',
    describe:'add new note',
    //builder command lets u define properties such as title, body, footer etc as doene below.
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true, //makes the title argumets required for the program,
            type: 'string',// specifies the kind of output for 'title' property
            
        },

        body:{
            describe:'Note Body',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){notes.addNote(argv.title,argv.body)},
})

yargs.command({
    command:'remove',
    describe:'removing the note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true, //makes the title argumets required for the program,
            type: 'string',// specifies the kind of output for 'title' property
            
        },        
    },
    handler(argv){notes.removeNote(argv.title)}
})

yargs.command({
    command:'list',
    describe:'Listing the Notes',
    handler(){notes.listNotes()}
})

yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){notes.readNote(argv.title)}
})

yargs.parse()

//console.log(yargs.argv)// yargs.parse{} instead