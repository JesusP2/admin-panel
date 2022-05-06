import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { CreateTask, Task } from 'types';
import { useAuth } from './Auth';

interface IContext {
    tasks: null | Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    editableTask: Task;
    setEditableTask: React.Dispatch<React.SetStateAction<Task>>;
    findAllTasks: () => Promise<any>;
    findTaskById: (id: string) => Promise<any>;
    createTask: (task: Omit<Task, 'id' | 'createdAt' | 'edit'>) => Promise<any>;
    updateTask: (id: string, task: Partial<Omit<Task, 'id' | 'createdAt' | 'edit'>>) => Promise<any>;
    deleteTask: (id: string) => Promise<any>;
}

const TaskContext = createContext({} as IContext);

export function useTask() {
    return useContext(TaskContext);
}

const url = process.env.NEXT_PUBLIC_HOST;
export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<null | Task[]>([]);
    const [edit, setEdit] = useState(false);
    const [editableTask, setEditableTask] = useState<Task>({} as Task);
    const { currentUser } = useAuth();

    async function fetchWrapper(url: string, options?: RequestInit) {
        if (!currentUser) {
            throw new Error("Por favori inicia sesión")
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

    async function findAllTasks() {
        return fetchWrapper(`${url}/api/task`);
    }

    async function findTaskById(id: string) {
        return fetchWrapper(`${url}/api/task/${id}`);
    }

    async function createTask(task: CreateTask) {
        return fetchWrapper(`${url}/api/task`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
    }

    async function updateTask(id: string, task: Partial<CreateTask>) {
        return fetchWrapper(`${url}/api/task/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
    }

    async function deleteTask(id: string) {
        return fetchWrapper(`${url}/api/task/${id}`, { method: 'DELETE' });
    }

    const value: IContext = {
        tasks,
        setTasks,
        edit,
        setEdit,
        editableTask,
        setEditableTask,
        findAllTasks,
        findTaskById,
        createTask,
        updateTask,
        deleteTask,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
