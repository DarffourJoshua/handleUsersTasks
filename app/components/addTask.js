"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import postTask from "../lib/postTask";

const AddTask = () => {
    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setTask({...task, [e.target.name]: e.target.value});
    }

    const mutation = useMutation(postTask);

    const handleTask = () => mutation.mutate(task);

    return (
        <acticle 
            className="
                flex flex-col justify-center items-center mx-auto mt-20 bg-neutral-300 w-5/6
                z-10 w-full max-w-5xl dark:bg-slate-800 p-5 rounded-md shadow-lg
            ">
            <h1 className="text-3xl font-bold text-center ">Create a task</h1>
            <form 
                onSubmit={handleTask} 
                className="mt-auto w-1/2 p-5 "
            >
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title"
                    className="w-full col-span-3 p-2 mx-auto mt-2 mb-5 border dark:text-black"
                    value={task.title} 
                    onChange={handleChange} 
                    required 
                />
                
                <label htmlFor="decription">Description:</label>
                <textarea 
                    id="decription" 
                    name="decription"
                    className="w-full dark:text-black mt-2"
                    rows={4}
                    cols={50}
                    value={task.description} 
                    onChange={handleChange} 
                    required
                />
                <button 
                    type="submit"
                    className="p-2 w-32 text-white mx-auto my-10 bg-blue-500 rounded-md hover:bg-blue-300"
                >
                    {mutation.isLoading ? 'Sending...' : 'Send'}
                </button>
                {mutation.isSuccess && <p className="text-green">Task created successfully</p>}
                {mutation.isError && <p className="text-red">Error: {mutation.error.message}</p>}
            </form>
        </acticle>
    );
}

export default AddTask;