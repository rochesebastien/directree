import File from "./File";

type Folder = {
    id: number;
    name: string;
    annotation: string;
    parentFolderId: number;
    content: (File | Folder)[]
};
export default Folder;