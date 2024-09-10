import prisma from "@/app/lib/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {is, string, size, object, assert} from 'superstruct';

const task = object({
    title: size(string(), 1, 20),
    description: size(string(), 10 , 300)
})

// Handle DELETE requests (Delete)
const  DELETE = async (req) => {
    const id = req.query.id;
    try {
        const delItem = await prisma.task.delete({
            where: {id}
        });
        revalidatePath('/protectedRoute')
        return NextResponse.json({delItem});
    } catch (error) {
        return NextResponse.json({error});    
    }
}

// Handle GET requests (Read)
const GET = async () => {
    const todos = await prisma.task.findMany();
    return NextResponse.json({todos});
}

// Handle POST requests (Create)
const POST = async (req) => {
    const {title, description} = await req.json();

    try {
        assert(body, task);
        if(is(body, task))  {
            const todo = await prisma.task.create({
                data: {title, description}
            })
            revalidatePath('/protectedRoute');
            return NextResponse.json({todo});
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}

// Handle PUT requests (Update)
const PUT = async (req) => {
    const { title, description} = await req.json();
    const id = await req.query.id;

    try {
        assert({title, description}, task);
        if(is({title, description}, task))  {
            const updateItem = await prisma.task.update({
                where: {id},
                data: {title, description}
            });
            revalidatePath('/protectedRoute');
            return NextResponse.json({updateItem});
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}



export {GET, POST, PUT, DELETE};