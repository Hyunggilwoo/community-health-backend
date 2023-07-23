const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://hyunggilswoo:<password>@cluster0.7eh7glr.mongodb.net/?
                retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    important: Boolean,
    weight: Integer,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: 'James Richard',
    important: true,
    weight: 180,
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})

