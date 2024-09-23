import React, { useState } from 'react';
import FolderTree from '../FolderTree/FolderTree';
import Project from '../../types/Project';

const ProjectManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const createProject = (name: string) => {
        const newProject: Project = { id: Date.now().toString(), name };
        setProjects([...projects, newProject]);
    };

    return (
        <div>
            <h1>Project Manager</h1>
            <button onClick={() => createProject(prompt('Project name') || 'New Project')}>Create Project</button>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} onClick={() => setSelectedProject(project)}>
                        {project.name}
                    </li>
                ))}
            </ul>
            {selectedProject && <FolderTree project={selectedProject} />}
        </div>
    );
};

export default ProjectManager;
