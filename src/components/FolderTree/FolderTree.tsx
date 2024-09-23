import React, { useState } from 'react';
import TreeItem from '../TreeItem/TreeItem';
import Project from '../../types/Project';
import Folder from '../../types/Folder';
import File from '../../types/File';
import MarkdownConverter from '../MarkdownConverter/MarkdownConverter';

interface FolderTreeProps {
    project: Project;
}

const FolderTree: React.FC<FolderTreeProps> = ({ project }) => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    
    const createFolder = (name: string, indentation: number = 0) => {
        const newFolder: Folder = { id: Date.now().toString(), name, extension: '', indentation };
        setFolders([...folders, newFolder]);
    };

    
    const createFile = (name: string, extension: string, folderId: string | null = null) => {
        let indentation = 0;
        if (folderId) {
            const parentFolder = folders.find(folder => folder.id === folderId);
            if (parentFolder) {
                indentation = parentFolder.indentation + 1; // file will be place in the folder
            }
        }
        const newFile: File = { id: Date.now().toString(), name, extension, indentation };
        setFiles([...files, newFile]);
    };

    
    const exportMarkdown = () => {
        const markdown = MarkdownConverter.convert(folders, files);
        console.log(markdown); 
        alert(markdown); 
    };

    return (
        <div>
            <h2>{project.name}</h2>
            <button onClick={() => createFolder(prompt('Folder name') || 'New Folder')}>Create Folder</button>
            <button
                onClick={() => {
                    const folderId = prompt('Enter folder ID or leave blank for root');
                    createFile(
                        prompt('File name') || 'New File',
                        prompt('File extension') || 'txt',
                        folderId ? folderId : null
                    );
                }}
            >
                Create File in Folder
            </button>

            <button onClick={exportMarkdown}>Export Project to Markdown</button>

            <div>
                {folders.map((folder) => (
                    <div key={folder.id}>
                        <TreeItem name={folder.name} indentation={folder.indentation} />
                        {files
                            .filter((file) => file.indentation === folder.indentation + 1)
                            .map((file) => (
                                <TreeItem
                                    key={file.id}
                                    name={`${file.name}.${file.extension}`}
                                    indentation={file.indentation}
                                />
                            ))}
                    </div>
                ))}
                {files.filter((file) => file.indentation === 0).map((file) => (
                    <TreeItem key={file.id} name={`${file.name}.${file.extension}`} indentation={file.indentation} />
                ))}
            </div>
        </div>
    );
};

export default FolderTree;