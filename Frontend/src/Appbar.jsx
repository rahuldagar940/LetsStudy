import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";

function Appbar() {
    const navigate = useNavigate();
    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding:4
    }}>
        <div>
            {/* <Typography>Nalanda</Typography> */}
            <Button variant="outlined" onClick={()=>{
                navigate("/courses");
            }}><Typography>Nalanda</Typography></Button>
        </div>
        
        <div style={{display: "flex"}}>
            <div style={{marginRight: 10}}>
                <Button variant="contained" 
                onClick={()=>{
                    navigate("/signup");
                }} >SignUp</Button>
            </div>
            <div>
                <Button variant="contained"
                onClick={()=>{
                    navigate("/signin");

                }}
                >SignIn</Button>
            </div>
        </div>
    </div>
}

export default Appbar