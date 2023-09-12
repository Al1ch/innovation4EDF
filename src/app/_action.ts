'use server';
import { addFile } from "../../lib/files";
import { FileFormat } from "@/model"

export const addFileData = async (file : FileFormat) => {
    try{
        const data = await addFile(file);
        return {data}
    }
    catch(e){
        return {error:e}
    }
}