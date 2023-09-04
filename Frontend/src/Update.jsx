import { TextField, Typography } from '@mui/material';
import { Card, Button } from '@mui/material';
import Courses from './Courses';
import { useNavigate } from "react-router-dom";
function Update() {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card variant={'outlined'} style={{ width: 400, marginRight: '20px', display: 'inline-block', maxHeight: 'fit-content' }}>
                <TextField fullWidth id="email" label="Email" variant="standard" /><br /><br />
                <TextField fullWidth id="name" label="Full Name" variant="standard" /><br /><br />
                <TextField fullWidth id="phoneNumber" label="Phone Number" variant="standard" /><br /><br />
                <TextField fullWidth id="college" label="College/University" variant="standard" /><br /><br />
                <Button size='large'
                    variant="contained"
                    style={{ marginTop: 10 }}
                    onClick={()=>{
                        fetch(`${baseURL}/$update`, {
                            method: "POST",
                            body: JSON.stringify({
                                email,
                                name,
                                phoneNumber,
                                college
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
                >Update</Button>
            </Card>
            <div style={{ width: '50%', paddingLeft: '20px' }}>
                <div><h2>Suggestions</h2></div>
                <div>
                    <Courses/><br></br>
                    
                </div>
            </div>
        </div>
    )
}

export default Update;