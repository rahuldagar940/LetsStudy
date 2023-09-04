const express = require('express');
const mongoose = require('mongoose');
const router = express.Router(); // Create a new router instance

//Schema
const courseSchema = new mongoose.Schema({
    courseID: Number,
    courseDetails: String,
    duration: String,
    price: Number,
    image: String
});

//Model

const Course = mongoose.model('Course', courseSchema);

//Course All Routes implementation 

router.post('/courses', async (req, res) => {
    try {
        const newCourse = new Course({
            courseID: Math.floor(Math.random() * 500) + 100,
            courseDetails: req.body.courseDetails,
            duration: req.body.duration,
            price: req.body.price
        })
        await newCourse.save();
        res.send('Course Saved');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error saving Admin');
    }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        console.log(courses);
        res.json({ courses });
    } catch (error) {
        res.status(500).send('Error fetching Courses');
    }
});

router.get('/courseshello', (req, res) => {
    res.send('Hello from courses');
});

module.exports = router;
