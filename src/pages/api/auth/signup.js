import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const client = await clientPromise;
    const db = client.db();
    const existing = await db.collection("Users").findOne({ email });
    if (existing) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.collection("Users").insertOne({
        name,
        email,
        password: hashed,
        isActive: true,    // Set to true for auto-activation
        isDeleted: false,
    });

    res.status(201).json({ message: "User created successfully" });
}