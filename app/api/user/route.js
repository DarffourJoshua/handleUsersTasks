import { NextResponse } from 'next/server';
import { comparePass } from '../createUser/route';
import {is,object, string, assert, define, size} from 'superstruct';
import isEmail from 'is-email';
import prisma from '@/app/lib/client';

// Function to exclude user password returned from prisma
function exclude(user, keys) {
    for (let key of keys) {
      delete user[key];
    }
    return user;
}

const Email = define('Email', isEmail);

const signIn = object({
    email: Email,
    password: size(string(), 8, 30)
})

const POST = async (req) => {
    const body = await req.json();

    try {
        assert(body, signIn);
        if (is(body, signIn))  {
            const user = await prisma.user.findUnique({
                where: {email: body.email},
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });

            if (user && comparePass(body.password, user.password))   {
                return NextResponse.json(exclude(user, ["password"]));
            }   else    {
                return NextResponse.json({message: 'invalid credentials'})
            }
        }
    }   catch(e)   {
        //throw new Error(e);
        return NextResponse.json({message: 'Oops🫢, something went wrong!'})
    }
}

export {POST};
