import { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            setSuccess("Signup successful! You can now login.");
            setTimeout(() => router.push("/login"), 1500);
        } else {
            setError(data.message || "Signup failed");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Sign Up
                </Button>
            </form>
            <Button onClick={() => router.push("/login")} sx={{ mt: 2 }}>Already have an account? Login</Button>
        </Box>
    );
}