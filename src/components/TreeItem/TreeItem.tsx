import React from 'react';
import './TreeItem.css';
import File from '../../types/File';
import Folder from '../../types/Folder';
import Project from '../../types/Project';

interface TreeItemProps {
  name: string;
  indentation: number;
  annotation: string;
  item: File | Folder;
  project: Project;
  onProjectUpdate: (project: Project) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({ name, indentation, annotation, item, project, onProjectUpdate }) => {
  const handleClick = () => {
    alert(`Annotation: ${annotation}`);
  };  
  
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      let updatedProject = { ...project };

  const handleEditName = () => {
    const newName = prompt('Enter the new name:', name);
    if (newName !== null) {
      let updatedProject = { ...project };
      const updateItemName = (currentItem: File | Folder) => {
        if (currentItem.id === item.id) {
          currentItem.name = newName;
        }
        if ('content' in currentItem && currentItem.content) {
          currentItem.content.forEach(updateItemName);
        }
      };
      
      updateItemName(updatedProject.rootFolder);
      onProjectUpdate(updatedProject);
    }
  };

  const handleEditAnnotation = () => {
    const newAnnotation = prompt('Enter the new annotation:', annotation);
    if (newAnnotation !== null) {
      let updatedProject = { ...project };
      const updateItemAnnotation = (currentItem: File | Folder) => {
        if (currentItem.id === item.id) {
          currentItem.annotation = newAnnotation;
        }
        if ('content' in currentItem && currentItem.content) {
          currentItem.content.forEach(updateItemAnnotation);
        }
      };
      
      updateItemAnnotation(updatedProject.rootFolder);
      onProjectUpdate(updatedProject);
    }
  };

      const deleteItem = (currentItem: Folder, parent: Folder | null) => {
        if (currentItem.id === item.id) {
          if (parent) {
            parent.content = parent.content.filter(child => child.id !== item.id);
          }
        } else if ('content' in currentItem && currentItem.content) {
          currentItem.content.forEach(child => {
            deleteItem(child as Folder, currentItem);
          });
        }
      };

      deleteItem(updatedProject.rootFolder, null);
      onProjectUpdate(updatedProject);
    }
  };

  const getElementStyle = () => {
    return { paddingLeft: `${indentation * 20}px`};
  };
  
  return (
    <div className='tree-item' style={getElementStyle()}>
      <span className='item-name' onClick={handleClick}>{name}</span>
      <button className='edit-button' onClick={handleEditName}>Edit Name</button>
      <button className='edit-button' onClick={handleEditAnnotation}>Edit Annotation</button>
      <button className='delete-button' onClick={handleDelete}>Delete</button>
    </div>
  );

};

export default TreeItem;
