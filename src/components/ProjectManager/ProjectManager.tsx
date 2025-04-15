import React, { useState, useEffect, MouseEvent } from 'react';
import FolderTree from '../FolderTree/FolderTree';
import Project from '../../types/Project';
import './ProjectManager.css';

const LOCAL_STORAGE_KEY = 'projects';

const ProjectManager: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const storedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedProjects) {
            setProjects(JSON.parse(storedProjects));
        } else {
            setProjects([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    }, [projects]);



    const createProject = (name: string) => {
        const id = Date.now();
        const newProject: Project = {
            id: id,
            name: name,
            rootFolder: {
                id: id,
                name: name,
                annotation: "",
                parentFolderId: -1,
                content: []
            }
        };
        setProjects([...projects, newProject]);
    };

    const deleteProject = (event: MouseEvent<HTMLButtonElement>, projectToDelete: Project) => {
        event.stopPropagation();
        if (window.confirm(`Are you sure you want to delete the project "${projectToDelete.name}"?`)) {
            setProjects(projects.filter(project => project.id !== projectToDelete.id));
            if (selectedProject?.id === projectToDelete.id) {
                setSelectedProject(null);
            }
        }
    };

    const renameProject = (event: MouseEvent<HTMLButtonElement>, projectToRename: Project) => {
        event.stopPropagation();
        const newName = prompt('Enter new name for the project:', projectToRename.name);
        if (newName && newName !== projectToRename.name) {
            setProjects(projects.map(project => {
                if (project.id === projectToRename.id) {
                    return { ...project, name: newName };
                }
                return project;
            }));
        }
    };

    return (
        <div>
            <h1>Project Manager</h1>
            <button onClick={() => createProject(prompt('Project name') || 'New Project')}>Create Project</button>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (                    
                    <li key={project.id} onClick={() => setSelectedProject(project)} className='project-list-item'>
                        <span className='project-name'>{project.name}</span>
                        <button className='edit-button' onClick={(event) => renameProject(event, project)}>
                            Rename                            
                        </button>
                        <button className='delete-button' onClick={(event) => deleteProject(event, project)}>
                        </button>
                        <button onClick={(event) => deleteProject(event, project)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
             {selectedProject && <FolderTree project={selectedProject}/>}
        </div>
    );
};

export default ProjectManager;
