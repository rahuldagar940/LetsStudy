const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();// Create a new router instance
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const secretKey = '3xtr4';


// Student Schema********************************************************* */
const studentSchema = new mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    studentID: String,
    name: String,
    phoneNumber: String,
    college: String,
    purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

// Model******************************************************************** */
const Student = mongoose.model('Student', studentSchema);

//Authenticating Students************************************************** */
async function authenticate(email, password) {
    var ifExist = await Student.findOne({ email });
    if (!ifExist) {
        console.log("No Account"); // Student does not exist
        return false;
    } else {
        console.log(ifExist);
        if (ifExist.password === password) {
            return true; // Return true to indicate authentication success
        }
        else {
            console.log('Incorrect Password');
            return false;
        }
    }
}
//Finding if student exist********************************************** */
// async function findStudent(email) {
//     ifExist = await Student.findOne({ email });
//     if (ifExist) {
//         return -1; // Student exists
//     } else {
//         return 0;  // Student does not exist
//     }
// }
//Routes***************************************************************** */
router.post('/studentSignup', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const studentStatus = await Student.findOne({ email });

        if (studentStatus) {
            res.status(409).send('Student Exists! Please login into your existing account');
        } else {
            const newStudent = new Student({
                _id: crypto.randomBytes(16).toString('hex'),
                email,
                password
            });
            const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
            await newStudent.save();
            res.json({
                message: 'Student Saved',
                token: token
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving Student');
    }
});
//********************************************************************* */
// router.get('/studentSignin', async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         const students = await Student.find({});
//         console.log(students);
//         res.json({ students });
//     } catch (error) {
//         res.status(500).send('Error fetching Student');
//     }
// });

//************************************************************************************** */
router.post('/studentSignin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const authenticated = await authenticate(email, password);

        if (authenticated) {
            // If authentication is successful, generate a JWT token
            const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Authentication failed. Please check your email and password.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during authentication');
    }
});
//*******************AuthToken Method to verify token validity and know who it bwlongs to********************* */
//** **************Will complete it if feels the need to do make it a function else i can just verify token in routes*******  */
// async function authToken(token){
//     const newEmail = jwt.verify(token, secretKey);
//     var stuData = await Student.findOne({ newEmail });
//     return stuData;
// }
//*********************************Register******************************************************************* */
router.post('/update', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token format' });
    }


    const token = authHeader.substring(7);
    console.log(token);
    try {
        // Verify the token to get the user's email
        const userEmail = jwt.verify(token, secretKey);
        console.log(userEmail);
        // Find the user based on the email
        const student = await Student.findOne({ email: userEmail.email });
        if (!student) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Update the user's information
        const { name, phoneNumber, college } = req.body;
        student.name = name;
        student.phoneNumber = phoneNumber;
        student.college = college;

        // Save the updated user information
        await student.save();

        res.json('User information updated successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }


})
//********************************Demo Route************************************************************** */
router.get('/studentshello', (req, res) => {
    res.send('Hello Students');
});
//******************************Router Export*************************************************************** */
module.exports = router; // Export the router


//*************Token Decoded******************* */
// async function authTOken(token, secretKey) {
//     try {
//         // Verify the token to get the user's email
//         const userEmail = jwt.verify(token, secretKey);
//     }
//     catch {

//     }
// }
//**********************Singin Route**************************************************************************** */
router.post('/studentSignin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const authenticated = await authenticate(email, password);

        if (authenticated) {
            // If authentication is successful, generate a JWT token
            const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during authentication');
    }
});





