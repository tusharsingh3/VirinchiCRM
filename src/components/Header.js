import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { signOut } from "next-auth/react"

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    CRM Dashboard
                </Typography>
                <Button color="inherit" onClick={() => signOut()}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}