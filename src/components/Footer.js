import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <Box sx={{ p: 2, textAlign: 'center', mt: 'auto', bgcolor: 'background.paper' }}>
            <Typography variant="body2" color="text.secondary">
                &copy; {new Date().getFullYear()} CRM Dashboard. All rights reserved.
            </Typography>
        </Box>
    );
}