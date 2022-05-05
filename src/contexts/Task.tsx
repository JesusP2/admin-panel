import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { CreateTask, Task } from 'types';

interface IContext {
    tasks: null | Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    editableTask: Task;
    setEditableTask: React.Dispatch<React.SetStateAction<Task>>;
    findAllTasks: () => Promise<any>;
    findTaskById: (id: string) => Promise<any>;
    findTasksByUserId: (uid: string) => Promise<any>;
    findTasksByProjectId: (projectId: string) => Promise<any>;
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

    async function fetchWrapper(fn: () => Promise<any>) {
        const res = await fn();
        if (!res.ok) {
            throw new Error((await res.json()).error);
        }
        return res.json();
    }

    async function findAllTasks() {
        const fn = async () => fetch(`${url}/api/task`);
        return fetchWrapper(fn);
    }

    async function findTaskById(id: string) {
        const fn = async () => fetch(`${url}/api/task/${id}`);
        return fetchWrapper(fn);
    }

    async function findTasksByUserId(uid: string) {
        //TODO: Implement endpoint
        const fn = async () => fetch(`${url}/api/user/${uid}/task`);
        return fetchWrapper(fn);
    }

    async function findTasksByProjectId(projectId: string) {
        //TODO: Implement endpoint
        const fn = async () => fetch(`${url}/api/project/${projectId}/task`);
        return fetchWrapper(fn);
    }

    async function createTask(task: CreateTask) {
        const fn = async () =>
            fetch(`${url}/api/task`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
        return fetchWrapper(fn);
    }

    async function updateTask(id: string, task: Partial<CreateTask>) {
        const fn = async () =>
            fetch(`${url}/api/task/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
        return fetchWrapper(fn);
    }

    async function deleteTask(id: string) {
        const fn = async () => fetch(`${url}/api/task/${id}`, { method: 'DELETE' });
        return fetchWrapper(fn);
    }


    useEffect(() => {
        findAllTasks()
            .then((res) => {
                const tasks = res?.map((task: any) => ({
                    ...task,
                    edit: false,
                }));
                console.log(tasks)
                setTasks(tasks || []);
            })
            .catch((err) => console.log(err));
    }, []);

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
        findTasksByProjectId,
        findTasksByUserId,
        updateTask,
        deleteTask,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
