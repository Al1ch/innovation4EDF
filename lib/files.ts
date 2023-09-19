import prisma from "./prisma"
import { FileFormat } from "@/model"
export const addFile = async  (file: FileFormat) => {
    try{
       await prisma.file.create({
        data:{
            name: file.name,
            size: file.size,
            type: file.type,
            url : "cc",
            format: file.format
        }
    })
    }catch(e){
        return {error:e}
    }

}
export const getFiles = async () => {
    try{
        const files = await  prisma.file.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })
        return {files}
    }catch(e){
        return {error:e}

    }
}

export const deleteFile = async(fileId:number)=>{
    try{
        await prisma.file.delete({
            where:{
                id:fileId
            }
        })
    }catch(e){
        return {error:e}
    }
}