import { TextField, Typography } from '@mui/material';
import {Card, Button} from '@mui/material';
import { useState } from 'react';
import baseURL from './impConfig';
import { useNavigate } from "react-router-dom";
function Signin() {
    const [subPath, setSubPath] = useState('');
    const navigate = useNavigate();
    return (
        <>
            <div style={{
            paddingTop: 150, marginBottom: 15,
            display: "flex",
            justifyContent: 'center'
        }}>
            <Typography variant={'h6'}>Welcome Back! SignIn Below</Typography>
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
                        style={{
                            backgroundColor: subPath === 'studentSignin' ? 'darkblue' : '', // Change background color when clicked
                            color: subPath === 'studentSignin' ? 'white' : '', // Change text color when clicked
                          }}
                        onClick={() => {
                            setSubPath('studentSignin'); // Update subPath state
                        }}
                    >Student</Button>
                    <Button variant='outlined'
                    style={{
                        backgroundColor: subPath === 'professorSignin' ? 'darkblue' : '', // Change background color when clicked
                        color: subPath === 'professorSignin' ? 'white' : '', // Change text color when clicked
                      }}
                        onClick={() => {
                            setSubPath('professorSignin'); // Update subPath state
                        }}
                    >Professor</Button>
                </div>
                <TextField fullWidth id="email" label="Email" variant="standard" /><br /><br />
                <TextField fullWidth id="password" style={{ marginTop: 10 }} label="Password" variant="standard" type='password' /><br /><br />
                <Button size='large'
                    variant="contained"
                    style={{ marginTop: 10 }}
                    onClick={()=>{
                        let email = document.getElementById("email").value;
                        let password = document.getElementById("password").value;
                        navigate("/register");
                        // fetch(`${baseURL}/${subPath}`, {
                        //     method: "POST",
                        //     body: JSON.stringify({
                        //         email,
                        //         password
                        //     }),
                        //     headers: {
                        //         "content-type": "application/json"
                        //     }
                        // }).then(response => response.text()) // Get the response message
                        //     .then(message => {
                        //         // Use the message received from the server to display to the user
                        //         window.alert(message); // For debugging, you can replace this with your UI logic
                        //     })
                    }}
                >Sign In</Button>
            </Card>
        </div>
        </>
    )
}

export default Signin