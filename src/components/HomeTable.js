import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Sample data
const rows = [
    { id: 1, name: "Alice", email: "alice@email.com" },
    { id: 2, name: "Bob", email: "bob@email.com" },
];

const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
];

export default function HomeTable() {
    return (
        <Box sx={{ height: 400, width: '100%', maxWidth: 700, mx: 'auto', my: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Customer List</Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                disableSelectionOnClick
                autoHeight
            />
        </Box>
    );
}