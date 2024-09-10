'use client';

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import getTasks from "../lib/getTasks";
import deleteTask from "../lib/deleteTask";
import updateTask from "../lib/updateTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const ReadTask = () => {
    const router = useRouter();

    const { data, error, isLoading} = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const {mutate: mutateDel} = useMutation(deleteTask, {
        onSuccess: () => {
            console.log("Task deleted");
        },
    });
    const {mutate: mutateEdit} = useMutation(updateTask, {
        onSuccess: (updateTask) => {
            console.log("Task updated");
            router.push({
                pathname: "/editTask",
                query: {id: updateTask.id},
            });
        },
    });

    const handleEdit = (id) => {mutateEdit(id)};

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error fetching tasks: {error.message}</p>;
    
    return(
        <section>
            <h1>Read Task</h1>
            <article>
                {data?.map((item, index) => (
                    <div key={index}>
                        <div>
                            <h2>{item.title}</h2>
                            <span> {item.createdAt}</span>
                            <FontAwesomeIcon icon={faTrash} onClick={()=>mutateDel(item.id)}/>
                            <FontAwesomeIcon icon={faPencil} onClick={()=>handleEdit(item.id)}/>
                        </div>
                        <p>{item.description}</p>
                    </div>
                ))}
            </article>
        </section>
    );
}

export default ReadTask;