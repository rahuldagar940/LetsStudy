import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import  baseURL from './impConfig';
import Appbar from './Appbar';
import { Navigate, useNavigate } from 'react-router-dom';



function Signup(props) {
    const [subPath, setSubPath] = useState('');
    const navigate = useNavigate();
    // const [studentButtonDisabled, setStudentButtonDisabled] = useState(false);
    // const [professorButtonDisabled, setProfessorButtonDisabled] = useState(false);

    return <div>

        <div style={{
            paddingTop: 150, marginBottom: 15,
            display: "flex",
            justifyContent: 'center'
        }}>
            <Typography variant={'h6'}>Welcome to Nalanda! SignUp Below</Typography>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Card variant={'outlined'} style={{ width: 400 }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Button size='large'
                        variant='outlined'
                        id='student'
                        style={{
                            backgroundColor: subPath === 'studentSignup' ? 'darkblue' : '', // Change background color when clicked
                            color: subPath === 'studentSignup' ? 'white' : '', // Change text color when clicked
                          }}
                        onClick={() => {
                            setSubPath('studentSignup'); // Update subPath state
                        }}
                    >Student</Button>
                    <Button variant='outlined'
                        id='professor'
                        style={{
                            backgroundColor: subPath === 'professorSignup' ? 'darkblue' : '', // Change background color when clicked
                            color: subPath === 'professorSignup' ? 'white' : '', // Change text color when clicked
                          }}
                        onClick={() => {
                            setSubPath('professorSignup'); // Update subPath state
                        }}
                    >Professor</Button>
                </div>
                <TextField fullWidth id="email" label="Email" variant="standard" /><br /><br />
                <TextField fullWidth id="password" style={{ marginTop: 10 }} label="Password" variant="standard" type='password' /><br /><br />
                <Button size='large'
                    variant="contained"
                    style={{ marginTop: 10 }}
                    onClick={() => {
                        let email = document.getElementById("email").value;
                        let password = document.getElementById("password").value;
                        console.log(email);
                        console.log(password);
                        console.log(subPath);
                        console.log(baseURL);
                        console.log(`${baseURL}/${subPath}`)
                        fetch(`${baseURL}/${subPath}`, {
                            method: "POST",
                            body: JSON.stringify({
                                email,
                                password
                            }),
                            headers: {
                                "content-type": "application/json"
                            }
                        }).then(response => response.text()) // Get the response message
                            .then(message => {
                                // Use the message received from the server to display to the user
                                window.alert(message); // For debugging, you can replace this with your UI logic
                            })
                    }}
                >Sign Up</Button>
            </Card>
        </div>
        <div style={{
            paddingTop: 10, marginBottom: 15,
            display: "flex",
            justifyContent: 'center'
        }}>
            <Typography variant={'h6'} style={{ marginRight: '10px' }}>Already Have An Account! SignIn</Typography> 
            <Button size='small'
                    variant="contained"
                    style={{ paddingLeft: 10, marginTop: 10 }}
                    onClick={()=>{
                        navigate("/signin")
                    }}>SignIn</Button>
        </div>
    </div>
}

export default Signup