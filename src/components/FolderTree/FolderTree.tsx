import React, { useState, useEffect } from 'react';
import TreeItem from '../TreeItem/TreeItem';
import Project from '../../types/Project';
import Folder from '../../types/Folder';
import File from '../../types/File';
import './FolderTree.css';
import MarkdownConverter from '../MarkdownConverter/MarkdownConverter';

interface FolderTreeProps {
    project: Project; 
    onProjectUpdate: (updatedProject: Project) => void;
}

const isFolder = (item: File | Folder): item is Folder => {
    return (item as Folder).content !== undefined;
};

const renderContent = (content: (File | Folder)[], depth: number = 0) => {
    return content.map((item) => {
        if (isFolder(item)) {
            const paddingLeft = depth * 20;

            const handleEditName = (newProject: Project, newItem: File | Folder, newName: string) => {
              const updatedItem = { ...newItem, name: newName };
              const updatedContent = updateItemInContent(newProject.rootFolder.content, updatedItem);
              return updatedContent;
            };

            const handleDeleteItem = (newProject: Project, itemToDelete: File | Folder) => {
              const updatedContent = newProject.rootFolder.content.filter((item) => item.id !== itemToDelete.id);
                const updatedProject = { ...newProject, rootFolder: { ...newProject.rootFolder, content: updatedContent } };
                onProjectUpdate(updatedProject);
              
            };

            const handleEditAnnotation = (newProject: Project, newItem: File | Folder, newAnnotation: string) => {
              const updatedItem = { ...newItem, annotation: newAnnotation };
              const updatedContent = updateItemInContent(newProject.rootFolder.content, updatedItem);
              return updatedContent;
            };
            return (
                <div key={item.id} style={{paddingLeft: `${paddingLeft}px`}}>
                    <TreeItem name={item.name} annotation={item.annotation || ""} id={item.id} 
                    onDelete={() => {
                      handleDeleteItem(project, item);
                    }} onEditName={(newName:string) => {
                      const updatedContent = handleEditName(project, item, newName);
                      const updatedProject = { ...project, rootFolder: { ...project.rootFolder, content: updatedContent } };
                      onProjectUpdate(updatedProject);
                    }} onEditAnnotation={(newAnnotation: string) => {
                      const updatedContent = handleEditAnnotation(project, item, newAnnotation);
                      const updatedProject = { ...project, rootFolder: { ...project.rootFolder, content: updatedContent } };
                      onProjectUpdate(updatedProject);
                    }}/>
                    <div >
                        {renderContent(item.content, depth + 1)}
                    </div>
                </div>
            );
        } else {
            return <TreeItem key={item.id} name={item.name} annotation={item.annotation || ""} id={item.id} style={{paddingLeft: `${depth * 20}px`}}
            onDelete={() => {
              const updatedContent = project.rootFolder.content.filter((itemContent) => itemContent.id !== item.id);
                const updatedProject = { ...project, rootFolder: { ...project.rootFolder, content: updatedContent } };
                onProjectUpdate(updatedProject);
            }} onEditName={(newName:string) => {
              const updatedContent = updateItemInContent(project.rootFolder.content, { ...item, name: newName });
              const updatedProject = { ...project, rootFolder: { ...project.rootFolder, content: updatedContent } };
              onProjectUpdate(updatedProject);
            }} onEditAnnotation={(newAnnotation: string) => {
              const updatedContent = updateItemInContent(project.rootFolder.content, { ...item, annotation: newAnnotation });
              const updatedProject = { ...project, rootFolder: { ...project.rootFolder, content: updatedContent } };
              onProjectUpdate(updatedProject);
            }}/>;


        }
    });
};

const FolderTree: React.FC<FolderTreeProps> = ({ project, onProjectUpdate }) => {
    const [viewMode, setViewMode] = useState<'IDE' | 'TREE'>('IDE');
    const exportMarkdown = () => {
        const markdown = ""
        console.log(markdown); 
        alert(markdown); 
    };

    const handleCreateFile = (parentId: number) => {
        const fileName = prompt('Enter file name:');
        if (fileName) {
            const newFile: File = {
                id: Date.now(),
                name: fileName,
                annotation: '',
                parentFolderId: parentId,
            };
            const updatedProject = addFileOrFolder(project, newFile, parentId);
            onProjectUpdate(updatedProject);
        }
    };

    const handleCreateFolder = (parentId: number) => {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            const newFolder: Folder = {
                id: Date.now(),
                name: folderName,
                annotation: '',
                parentFolderId: parentId,
                content: [],
            };
            const updatedProject = addFileOrFolder(project, newFolder, parentId);
            onProjectUpdate(updatedProject);
        }
    };

    const addFileOrFolder = (currentProject: Project, item: File | Folder, parentId: number): Project => {
      const findParentFolder = (folder: Folder): Folder | null => {
          if (folder.id === parentId) {
              return folder;
          }
          for (const subItem of folder.content) {
              if (isFolder(subItem)) {
                  const foundFolder = findParentFolder(subItem);
                  if (foundFolder) {
                      return foundFolder;
                  }
              }
          }
          return null;
      };
  
      let targetFolder: Folder | null = null;
      if(currentProject.rootFolder.id == parentId){
        targetFolder = currentProject.rootFolder;
      } else {
        targetFolder = findParentFolder(currentProject.rootFolder);
      }
  
      if (targetFolder) {
          targetFolder.content.push(item);
      }
  
      return { ...currentProject };
  };

  const updateItemInContent = (content: (File | Folder)[], updatedItem: File | Folder): (File | Folder)[] => {
    return content.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      if (isFolder(item)) {
        return {
          ...item,
          content: updateItemInContent(item.content, updatedItem),
        };
      }
      return item;
    });
  };





    
    return (
        <div>
            <h2>Project: {project.name}</h2>
            <button onClick={() => setViewMode(viewMode === 'IDE' ? 'TREE' : 'IDE')}>
                Switch to {viewMode === 'IDE' ? 'TREE' : 'IDE'} View
            </button>
            <button onClick={exportMarkdown}>Export Project to Markdown</button>
            <div><button onClick={() => handleCreateFile(project.rootFolder.id)}>Create File</button>
            <button onClick={() => handleCreateFolder(project.rootFolder.id)}>Create Folder</button></div>
            {renderContent([project.rootFolder], 0)}
        </div>
    );
};
export default FolderTree;