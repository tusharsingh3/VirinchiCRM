import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

const drawerWidth = 200;

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(true)}
                sx={{ m: 1, position: 'fixed', zIndex: 1301 }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant="temporary"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box sx={{ width: drawerWidth }} role="presentation">
                    <List>
                        <ListItem button key="Home" onClick={() => { router.push("/home"); setOpen(false); }}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button key="Enquiries" onClick={() => { router.push("/enquiries"); setOpen(false); }}>
                            <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
                            <ListItemText primary="Enquiries" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}