export interface CreateUser {
    displayName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
}

export interface CreateTask {
    name: string;
    description: string;
    uid: string[];
    projectId: string;
    project: {
        name: string;
    }
    duration: string;
    tags: { tagId: string; tag: { id: string; name: string } }[];
}

export interface CreateProject {
    name: string;
    description: string;
    uid: string[];
    duration: string;
    tags: { tagId: string; tag: { id: string; name: string } }[];
}

export interface User extends CreateUser {
    uid: string;
    customClaims: {
        admin: boolean
    }
    edit: boolean;
}

export interface Task extends CreateTask {
    id: string;
    isFinished: boolean;
    updatedAt: string;
    createdAt: string;
    edit: boolean;
}

export interface Project extends CreateProject {
    id: string;
    isFinished: boolean;
    updatedAt: string;
    createdAt: string;
    edit: boolean;
}

export enum Tags {
    frontend = 'frontend',
    backend = 'backend',
    fullStack = 'full stack',
    desktop = 'desktop',
    web = 'web',
    database = 'database',
    mobile = 'mobile',
    cloud = 'cloud',
    ML = 'ML',
    CI_CD = 'CI/CD',
    software = 'software'
}
