export interface CreateUser {
    displayName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
}

export interface CreateTask {
    name: string;
    description: string;
    uid: User[];
    projectId: string;
    project: {
        name: string;
    }
    duration: string;
    tags: { taskId: string; tagId: string; tag: { id: string; name: string } }[];
}

export interface CreateProject {
    name: string;
    description: string;
    uid: User[];
    duration: string;
    tags: { taskId: string; tagId: string; tag: { id: string; name: string } }[];
}

export interface User extends CreateUser {
    uid: string;
    tasksCompleted: number;
    totalTasks: number;
    currentProject: string;
    edit: boolean;
}

export interface Task extends CreateTask {
    id: string;
    createdAt: string;
    edit: boolean;
}

export interface Project extends CreateProject {
    id: string;
    numberOfTasks: number;
    createdAt: string;
    edit: boolean;
}
