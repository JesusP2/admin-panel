export interface CreateUser {
    displayName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
}
export interface User extends CreateUser {
    uid: string;
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
