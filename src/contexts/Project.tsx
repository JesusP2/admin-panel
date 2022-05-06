import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { CreateProject, Project } from 'types';

interface IContext {
    projects: null | Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[] | null>>;
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    editableProject: Project;
    setEditableProject: React.Dispatch<React.SetStateAction<Project>>;
    findAllProjects: () => Promise<any>;
    findProjectById: (id: string) => Promise<any>;
    createProject: (project: Omit<Project, 'id' | 'createdAt' | 'edit'>) => Promise<any>;
    updateProject: (id: string, project: Partial<Omit<Project, 'id' | 'createdAt' | 'edit'>>) => Promise<any>;
    deleteProject: (id: string) => Promise<any>;
}

const ProjectContext = createContext({} as IContext);

export function useProject() {
    return useContext(ProjectContext);
}

const url = process.env.NEXT_PUBLIC_HOST;
export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<null | Project[]>([]);
    const [edit, setEdit] = useState(false);
    const [editableProject, setEditableProject] = useState<Project>({} as Project);

    async function fetchWrapper(fn: () => Promise<any>) {
        const res = await fn();
        if (!res.ok) {
            throw new Error((await res.json()).error);
        }
        return res.json();
    }

    async function findAllProjects() {
        const fn = async () => fetch(`${url}/api/project`);
        return fetchWrapper(fn);
    }

    async function findProjectById(id: string) {
        const fn = async () => fetch(`${url}/api/project/${id}`);
        return fetchWrapper(fn);
    }

    async function createProject(project: CreateProject) {
        const fn = async () =>
            fetch(`${url}/api/project`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
        return fetchWrapper(fn);
    }

    async function updateProject(id: string, project: Partial<CreateProject>) {
        const fn = async () =>
            fetch(`${url}/api/project/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
        return fetchWrapper(fn);
    }

    async function deleteProject(id: string) {
        const fn = async () => fetch(`${url}/api/project/${id}`, { method: 'DELETE' });
        return fetchWrapper(fn);
    }


    useEffect(() => {
        findAllProjects()
            .then((res) => {
                const projects = res?.map((project: any) => ({
                    ...project,
                    edit: false,
                }));
                console.log(projects)
                setProjects(projects || []);
            })
            .catch((err) => console.log(err));
    }, []);

    const value: IContext = {
        projects,
        setProjects,
        edit,
        setEdit,
        editableProject,
        setEditableProject,
        findAllProjects,
        findProjectById,
        createProject,
        updateProject,
        deleteProject,
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
