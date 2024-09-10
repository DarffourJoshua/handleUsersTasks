import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { is, assert, object, string, size,  define } from 'superstruct';
import isEmail from 'is-email';
import prisma from '@/app/lib/client';


//let hash the user password to enhance security
// Hashing password with bcrypt
const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };
  
  // For comparing password during login
const comparePass = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

const Email = define('Email', isEmail)

// validating the user credentials
const signUp = object({
    // email: refine(string(), 'email', v => isEmail.validate(v)),
    email: Email,
    password: size(string(), 8, 30),
});

const POST = async (req) => {
    const {email, password} = await req.json();
    
    assert({email, password}, signUp);

    try {
        if(is({email, password}, signUp))   {
            const user = await prisma.user.create({
                data: {email, password: hashPass(password)}
            });
            console.log(user);
            return NextResponse.json({user});
        }
    }   catch(e)   {
        if(e instanceof Prisma.PrismaClientKnownRequestError)   {
            if (e.code === 'P2002') {
                return NextResponse.json({message: e.message});
            }
        }
        return NextResponse.json({message: e.message})
    }
}

export {POST, comparePass, hashPass};