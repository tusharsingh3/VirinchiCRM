import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (res.ok) {
            router.push("/home");
        } else {
            setError(res.error || "Login failed");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
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
                    Login
                </Button>
            </form>
            <Button onClick={() => router.push("/signup")} sx={{ mt: 2 }}>Dont have an account? Sign Up</Button>
        </Box>
    );
}