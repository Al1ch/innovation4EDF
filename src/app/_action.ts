'use server';
import { revalidatePath } from "next/cache";
import { addFile } from "../../lib/files";
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