import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "../../../../lib/prisma";
export async function POST(req: Request){
    try{
       const body = await req.json();
       const  {email , password , username} = body;
       const isUserAlreadyExist = await prisma.user.findUnique({
              where:{
                email : email
              }
         })

         if(isUserAlreadyExist){
             return NextResponse.json({
                 status: 400,
                 body:{
                     message: "User already exist"
                 }
             })
        }

        const isUserNameAlreadyExist = await prisma.user.findUnique({
            where:{
                username: username
            }
        })

        if(isUserNameAlreadyExist){
            return NextResponse.json( {
                status: 400,
                body:{
                    message: "Username already exist"
                }
            })
        }

        const hashedPassword = await hash(password, 10);
    
            const user = await prisma.user.create({
                data:{
                    email: email,
                    password: hashedPassword,
                    username: username
                }
            })
            return NextResponse.json({
                status: 200,
                body:{
                    message: "User created successfully",
                    user: user
                }
            })
        
    }catch(e){
        console.log(e)
        return NextResponse.json({
            status: 500,
          });
    }
    
}