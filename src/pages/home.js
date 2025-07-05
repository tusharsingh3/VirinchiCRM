import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import EnquiriesTable from "@/components/EnquiriesTable";

export default function HomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.replace("/login");
        }
    }, [session, status]);

    if (!session) return null;

    return (
        <Layout>
            <EnquiriesTable />
        </Layout>
    );
}