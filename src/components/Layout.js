import Box from "@mui/material/Box";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Sidebar />
            <Box component="main" sx={{ flex: 1, p: 3, mt: 2 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}