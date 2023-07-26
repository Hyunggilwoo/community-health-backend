// console.log("Hello World")

const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')

const app = express()
const BILLION = 1000000000;

// parsing information retrieved from server
app.use(express.json())

// using morgan tiny configuration to log output: https://github.com/expressjs/morgan
// const tinyLogConfig = morgan(':method :url :status :res[content-length] - :response-time ms')

// app.use(tinyLogConfig)

app.use(cors())

app.use(express.static('build'))

let persons =  [
    {
      name: "Wonto Wood",
      important: false,
      age: 40,
      id: 4
    },
    {
      name: "Holly Ridge",
      important: false,
      age: 33,
      id: 5
    },
    {
      name: "Hurricane Ridge",
      important: false,
      age: 23,
      id: 6,
      weight: "160"
    },
    {
      name: "Issac",
      important: true,
      id: 7,
      age: 3,
      weight: "10"
    }
  ]



    const currentTime = (request, response, next) => {
        request.currentTime = new Date();
        next();
    }

    app.use(currentTime)

    const requestLogger = (request, response, next) => {
        console.log('Method:', request.method)
        console.log('Path:  ', request.path)
        console.log('Body:  ', request.body)
        console.log('---')
        next()
    }

    app.use(requestLogger)

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
      });
      
    app.get('/', (request, response) => {
        response.end('<h1>Hello World </h1>')
    })

    // route to get information from server
    app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        console.log(id)
        const person = persons.find(person => {
            console.log(person.id, typeof person.id, id, typeof id, person.id === id)
            return person.id === id
        })
        if (person) {
            response.json(person)
        } else {
            response.status(404).json({
                error: 'There is no customer with the above id number'
            })
        }

    })

    /**
     * Generate a new id for each client
     * @returns 
     */
    const generalId = () => {
        const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0

        return maxId + 1;
    }

    const randomId = () => {
        return Math.floor(Math.random() * BILLION);
    }

    app.post('/api/persons', (request, response) => {
        const body = request.body
        // post token here
        // morgan.token('type', )
        const existingPerson = persons.find((person) => person.name === body.name);

        if (existingPerson) {
            return response.status(400).json({
                error: 'name already exists in customerbook. Name must be unique'
            })
            
        } else if (!body.name) {
            return response.status(400).json({
                error: 'name missing'
            })
        } else if (!body.weight) {
            return response.status(400).json({
                error: 'weight is missing'
            })
        } else if (!body.age) {
            return response.status(400).json({
                error: 'age is missing'
            })
        }// name already exists in customerbook

        const person = {
            name: body.name,
            important: body.important || false,
            id: randomId(),
            weight: body.weight,
            age: body.age,
        }

        persons = persons.concat(person)

        console.log(person)
        response.json(person)
    })
    
    
    // route to delete information from server
    app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)

        response.status(204).end()
    })

    app.get('/api/persons', (request, response) => {
        response.json(persons)
    })

    // obtain number of customers stored on api/persons
    app.get('/info', async (request, response) => {
        try {
            const personsDataFromApi = persons;
            const currentTime = request.currentTime;
            const infoData =  {
                        message: `Customer book has info for ${personsDataFromApi.length} people`,
                        time: `${currentTime} </p>`  
                        }
            response.json(infoData)
        } catch (error) {
            response.status(500).json({ error: 'Error Fetching data from /api/persons'});
        }
    });

    const PORT = process.env.PORT || 3001
    app.listen(PORT, ()=> {
        console.log(`Server running on port ${PORT}`)
    })

// app.listen(PORT)
// console.log(`Console running on port ${PORT}`)
