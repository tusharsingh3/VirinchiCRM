import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
    Box,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function EnquiriesTable() {
    const [data, setData] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        fetch("/api/enquiries")
            .then((res) => res.json())
            .then((enquiries) => setData(enquiries));
    }, []);

    const exportHeaders = [
        "Name",
        "Email",
        "Phone Number",
        "Message",
        "Remarks",
        "Followed Up",
    ];

    const exportRows = data.map((row) => ({
        "Name": row.name,
        "Email": row.email,
        "Phone Number": row.phone,
        "Message": row.message,
        "Remarks": row.remarks,
        "Followed Up": row.isFollowedUp ? "Yes" : "No",
    }));

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(exportRows);
        XLSX.utils.sheet_add_aoa(worksheet, [exportHeaders], { origin: "A1" });

        // Set custom column widths (in "characters")
        worksheet['!cols'] = [
            { wch: 20 }, // Name
            { wch: 30 }, // Email
            { wch: 15 }, // Phone Number
            { wch: 40 }, // Message
            { wch: 30 }, // Remarks
            { wch: 16 }, // Followed Up
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
        XLSX.writeFile(workbook, "enquiries.xlsx");
    };

    const handleExportHTML = () => {
        const worksheet = XLSX.utils.json_to_sheet(exportRows);
        XLSX.utils.sheet_add_aoa(worksheet, [exportHeaders], { origin: "A1" });

        const html = XLSX.utils.sheet_to_html(worksheet, {
            editable: false,
        });

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        downloadFile(url, "enquiries.html");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "A4",
        });
        autoTable(doc, {
            head: [exportHeaders],
            body: data.map((row) => [
                row.name,
                row.email,
                row.phone,
                row.message,
                row.remarks,
                row.isFollowedUp ? "Yes" : "No",
            ]),
            styles: {
                fontSize: 10,
                cellPadding: 8,
            },
            columnStyles: {
                0: { cellWidth: 120 }, // Name
                1: { cellWidth: 170 }, // Email
                2: { cellWidth: 90 },  // Phone Number
                3: { cellWidth: 200 }, // Message
                4: { cellWidth: 140 }, // Remarks
                5: { cellWidth: 70 },  // Followed Up
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: 255,
                fontStyle: 'bold',
            },
            margin: { left: 20, right: 20, top: 30, bottom: 20 },
        });
        doc.save("enquiries.pdf");
    };

    function downloadFile(url, filename) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Inline editing handlers
    const handleEdit = (row) => {
        setEditingRow(row._id);
        setEditedValues({ remarks: row.remarks, isFollowedUp: row.isFollowedUp });
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditedValues({});
    };

    const handleSave = async (row) => {
        try {
            const response = await fetch("/api/enquiries", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: row._id, ...editedValues }),
            });
            if (response.ok) {
                setData((prev) =>
                    prev.map((r) =>
                        r._id === row._id ? { ...r, ...editedValues } : r
                    )
                );
                setSnackbar({
                    open: true,
                    message: "Enquiry updated!",
                    severity: "success",
                });
            } else {
                setSnackbar({
                    open: true,
                    message: "Failed to update enquiry.",
                    severity: "error",
                });
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: "Error updating enquiry.",
                severity: "error",
            });
        }
        setEditingRow(null);
        setEditedValues({});
    };

    // Deletion with MUI Dialog
    const handleDeleteClick = (row) => {
        setRowToDelete(row);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setRowToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch("/api/enquiries", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: rowToDelete._id }),
            });
            if (response.ok) {
                setData((prev) => prev.filter((r) => r._id !== rowToDelete._id));
                setSnackbar({
                    open: true,
                    message: "Enquiry deleted!",
                    severity: "success",
                });
            } else {
                setSnackbar({
                    open: true,
                    message: "Failed to delete enquiry.",
                    severity: "error",
                });
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: "Error deleting enquiry.",
                severity: "error",
            });
        }
        setDialogOpen(false);
        setRowToDelete(null);
    };

    // Columns
    const columns = useMemo(
        () => [
            { accessorKey: "name", header: "Name" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "phone", header: "Phone Number" },
            { accessorKey: "message", header: "Message" },
            {
                accessorKey: "remarks",
                header: "Remarks",
                Cell: ({ row }) =>
                    editingRow === row.original._id ? (
                        <input
                            value={editedValues.remarks ?? ""}
                            onChange={(e) =>
                                setEditedValues((vals) => ({
                                    ...vals,
                                    remarks: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        row.original.remarks
                    ),
            },
            {
                accessorKey: "isFollowedUp",
                header: "Followed Up",
                Cell: ({ row }) =>
                    editingRow === row.original._id ? (
                        <select
                            value={editedValues.isFollowedUp ?? false}
                            onChange={(e) =>
                                setEditedValues((vals) => ({
                                    ...vals,
                                    isFollowedUp: e.target.value === "true",
                                }))
                            }
                        >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    ) : row.original.isFollowedUp ? "Yes" : "No",
            },
            {
                header: "Actions",
                Cell: ({ row }) =>
                    editingRow === row.original._id ? (
                        <>
                            <IconButton onClick={() => handleSave(row.original)}>
                                <SaveIcon />
                            </IconButton>
                            <IconButton onClick={handleCancel}>
                                <CancelIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Tooltip title="Edit">
                                <IconButton onClick={() => handleEdit(row.original)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => handleDeleteClick(row.original)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    ),
            },
        ],
        [editingRow, editedValues]
    );

    // Custom Top Toolbar with Export Buttons (left aligned)
    const renderTopToolbarCustomActions = () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleExportExcel}>
                Export Excel
            </Button>
            <Button variant="outlined" size="small" onClick={handleExportHTML}>
                Export HTML
            </Button>
            <Button variant="outlined" size="small" onClick={handleExportPDF}>
                Export PDF
            </Button>
        </Box>
    );

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", my: 4 }}>
            <MaterialReactTable
                columns={columns}
                data={data}
                enableSorting
                enableColumnFilters
                enablePagination
                initialState={{ pagination: { pageSize: 5 } }}
                enableRowActions={false}
                enableEditing={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                enableGlobalFilter
                muiTableBodyRowProps={() => ({
                    sx: { cursor: "pointer" },
                })}
                renderTopToolbarCustomActions={renderTopToolbarCustomActions}
            />
            {/* Delete Confirmation Dialog */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Delete Enquiry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this enquiry? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}