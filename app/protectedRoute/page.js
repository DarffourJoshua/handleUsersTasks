import ReadTask from "../components/readTask";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectedRoute = () => {
    const { data: session } = useSession();
    const router = useRouter();
    if (session) {
        return (
            <ReadTask/>
        )
    }   else {
        return (
            router.push('/')
        )
    }  
}

export default ProtectedRoute;
