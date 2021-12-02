import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <br /><b>Welcome to the</b>
            <h1>Top 5 Lister Site</h1>
            <p>
                Create and share your Top 5 lists<br />
                for the world to see!
            </p>
            <Stack id="splash-menu" spacing={15} direction="row" justifyContent="center">
                <Button href="/register/" variant="contained" style={{width: '20%'}}>Register</Button>
                <Button href="/login/" variant="contained" style={{width: '20%'}}>Login</Button>
                <Button variant="contained" style={{width: '20%'}}>Continue as Guest</Button>
            </Stack>
            <b id="credit">Developed by Patrick Fan, CSE316 Final Project</b>
        </div>
    )
}
