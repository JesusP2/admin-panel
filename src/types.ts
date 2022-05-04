export interface User {
    id: string;
    name: string;
    email: string;
    tasksCompleted: number;
    totalTasks: number;
    currentProject: string;
    edit: boolean;
}

export interface Task {
    id: string;
    name: string;
    description: string;
    users: User[];
    project: Project;
    duration: string;
    tags: string[];
    createdAt: string;
    edit: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    users: User[];
    numberOfTasks: number;
    duration: string;
    tags: string[];
    createdAt: string;
    edit: boolean;
}
