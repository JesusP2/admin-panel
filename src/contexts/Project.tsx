import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { CreateProject, Project } from 'types';
import { useAuth } from './Auth';

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
    const { currentUser } = useAuth();
    const router = useRouter();

    async function fetchWrapper(url: string, options?: RequestInit) {
        if (!currentUser) {
            toast.error('Por favor inicia sesion');
            return;
        }
        const token = await currentUser.getIdToken();
        if (options) {
            options = { ...options };
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            };

            const res = await fetch(url, options);

            if (!res.ok) {
                throw new Error((await res.json()).error);
            }

            return res.json();
        }

        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) {
            throw new Error((await res.json()).error);
        }
        return res.json();
    }

    async function findAllProjects() {
        return fetchWrapper(`${url}/api/project`);
    }

    async function findProjectById(id: string) {
        return fetchWrapper(`${url}/api/project/${id}`);
    }

    async function createProject(project: CreateProject) {
        return fetchWrapper(`${url}/api/project`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
    }

    async function updateProject(id: string, project: Partial<CreateProject>) {
        return fetchWrapper(`${url}/api/project/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
    }

    async function deleteProject(id: string) {
        return fetchWrapper(`${url}/api/project/${id}`, { method: 'DELETE' });
    }

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
