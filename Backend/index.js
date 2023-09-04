const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://rahuldagar19:MongoDB%402022@cluster0.hir8llw.mongodb.net/Nalanda`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Import and use the students route
const studentsRouter = require('./students');
app.use(studentsRouter);

const coursesRouter = require('./courses');
app.use(coursesRouter);

const professorRouter = require('./professor');
app.use(professorRouter);


app.get('/', (req,res)=>{
    res.send('Hello From Index')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
