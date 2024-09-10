import { NextResponse } from 'next/server';
import { comparePass } from '../createUser/route';
import {is,object, string, assert, define, size} from 'superstruct';
import isEmail from 'is-email';
import prisma from '@/app/lib/client';


const Email = define('Email', isEmail);

const signIn = object({
    email: Email,
    password: size(string(), 8, 30)
})

const POST = async (req) => {
    const {email, password} = await req.json();

    try {
        assert({email, password}, signIn);
        if (is({email, password}, signIn))  {
            const user = await prisma.user.findUnique({
                where: {email: email},
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
            console.log(user);
            if (!user) {
                return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
            }
    
            // Compare the provided password with the stored hashed password
            const isPasswordValid = comparePass(password, user.password);
            if (!isPasswordValid) {
                return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
            }
    
            // Success: Return user data (without the password)
            return NextResponse.json({ user: { id: user.id, email: user.email } });
              
        }
    }   catch(e)   {
        //throw new Error(e);
        return NextResponse.json({message: 'Oops🫢, something went wrong!'})
    }
}

export {POST};
