'use client';

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import getTasks from "../lib/getTasks";
import deleteTask from "../lib/deleteTask";
import updateTask from "../lib/updateTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Header from './header'

const ReadTask = () => {
    const router = useRouter(); 
    const {data: session} = useSession();

    const { data, error, isLoading} = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const {mutate: mutateDel} = useMutation({
        mutationKey: ['tasks'],
        mutationFn: deleteTask,
        onSuccess: () => {
            console.log("Task deleted");
        },
    });
    const {mutate: mutateEdit} = useMutation ({
        mutationKey: ['tasks'],
        mutationFn: updateTask,
        onSuccess: (updateTask) => {
            console.log("Task updated");
            router.push({
                pathname: `/editTask/${id}`,
                query: {id: updateTask.id},
            });
        },
    });

    const handleEdit = (id) => {mutateEdit(id)};

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>{error.message && 'Oops, something went wrong!'}</p>;
    
    return(
        <main>
            <Header session={session}/>
            <h1>My tasks</h1>
            <button onClick={() => router.push('/addTask')}>Add task</button>
            <article>
                <p>{`Total number of tasks ${data.length}`}</p>
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
        </main>
    );
}

export default ReadTask;