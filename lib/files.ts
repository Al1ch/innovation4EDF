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