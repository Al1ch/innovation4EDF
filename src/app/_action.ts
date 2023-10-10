'use server';
import { revalidatePath } from "next/cache";
import { addFile, deleteFile, deleteAllFiles, getFiles, getFile } from "../../lib/files";
import { FileFormat } from "@/model"

export const addFileData = async (file : FileFormat, pathName: string) => {
    try{
        const data = await addFile(file);
        revalidatePath(pathName)
        return {data}
    }
    catch(e){
        return {error:e}
    }
}

export const deleteFileData = async (fileId: number, pathName: string) => {
    try{
        await deleteFile(fileId);
        revalidatePath(pathName)
    }
    catch(e){  
        return {error:e}
    }
}


export const deleteAllFilesData = async (pathName: string) => {
    try{
        await deleteAllFiles();
        revalidatePath(pathName)
    }
    catch(e){  
        return {error:e}
    }
}

export const getFilesData = async () => {
    try{
        const data = await getFiles();
        return data;
    }
    catch(e){
        return {error:e}
    }
}

export const getFileData = async(fileId : number) =>{
    try{
        const data = await getFile(fileId);
        return data;
    } catch(e){
        return {error:e}
    }
}

