const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const router = express.Router(); // Create a new router instance
const jwt = require('jsonwebtoken');

//***********Encryption Secret Key************ */
const secretKey = '3xtr4';

//*************************Professor Schema****************************************************** */
const professorSchema = new mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    name: String,
    peetCred: String,
    phoneNumber: Number
});

//**************************Model**************************************************************** */
const Professor = mongoose.model('Professor', professorSchema);
//************************************************************************************************* */
//Authenticating Students************************************************** */
async function authenticate(email, password) {
    var ifExist = await Professor.findOne({ email });
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

//*************************Routes**************************************************************** */
//*************Signup Route *****************************/
router.post('/professorSignup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const professorStatus = await Professor.findOne({ email: email });

        if (professorStatus) {
            res.status(409).send('Professor Exists');
        } else {
            const newProfessor = new Professor({
                _id: crypto.randomBytes(16).toString('hex'),
                email,
                password
            });
            await newProfessor.save();
            const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
            res.json({
                message: 'Professor Saved',
                token: token
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving Professor');
    }
});
//*************Signin Route *****************************/
router.post('/professorSignin', async (req, res) => {
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
//*********************************************************************** */
router.get('/professorhello', (req, res) => {
    res.send('Hello from Professor');
});
//******************************Exporting all Routes to index******************************************** */
module.exports = router;