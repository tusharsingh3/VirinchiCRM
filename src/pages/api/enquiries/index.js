import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(); // defaults to DB configured in your Mongo URI

    if (req.method === "GET") {
        const enquiries = await db
            .collection("Enquiries")
            .find({ isDeleted: { $in: [false, 0] } })
            .toArray();
        return res.status(200).json(enquiries);
    }

    if (req.method === "PATCH") {
        const { _id, remarks, isFollowedUp } = req.body;
        await db.collection("Enquiries").updateOne(
            { _id: new ObjectId(_id) },
            { $set: { remarks, isFollowedUp, updatedAt: new Date() } }
        );
        return res.json({ success: true });
    }

    if (req.method === "DELETE") {
        const { _id } = req.body;
        await db.collection("Enquiries").updateOne(
            { _id: new ObjectId(_id) },
            { $set: { isDeleted: true, updatedAt: new Date() } }
        );
        return res.json({ success: true });
    }

    res.status(405).end();
}