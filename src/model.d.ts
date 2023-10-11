export type FileFormat =Omit <File, 'name' | 'size' | 'type' | 'format' | 'url'> &{
    name: string;
    size: number;
    type: string;
    format?: string;
    url :string;
}

