import { createContext, ReactNode, useContext, useState } from 'react';
import type { User, CreateUser } from 'types';

interface IContext {
    users: null | User[];
    setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    editableUser: User;
    setEditableUser: React.Dispatch<React.SetStateAction<User>>;
    findAllUsers: () => Promise<any>;
    findUserById: (id: string) => Promise<any>;
    createUser: (user: CreateUser) => Promise<any>;
    updateUser: (id: string, user: Partial<CreateUser>) => Promise<any>;
    deleteUser: (id: string) => Promise<any>;
}

const UserContext = createContext({} as IContext);

export function useUser() {
    return useContext(UserContext);
}

const url = 'http://localhost:3000';
export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<null | User[]>([]);
    const [edit, setEdit] = useState(false);
    const [editableUser, setEditableUser] = useState<User>({} as User);

    async function fetchWrapper(fn: () => Promise<any>) {
        const res = await fn();
        if (!res.ok) {
            throw new Error((await res.json()).error);
        }
        return res.json();
    }
    async function findAllUsers() {
        const fn = async () => fetch(`${url}/api/user`);
        return fetchWrapper(fn);
    }

    async function findUserById(id: string) {
        const fn = async () => fetch(`${url}/api/user/${id}`);
        return fetchWrapper(fn);
    }

    async function createUser(user: CreateUser) {
        const fn = async () =>
            fetch(`${url}/api/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
        return fetchWrapper(fn);
    }

    async function updateUser(id: string, user: Partial<CreateUser>) {
        const fn = async () =>
            fetch(`${url}/api/user/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
        return fetchWrapper(fn);
    }

    async function deleteUser(id: string) {
        const fn = async () => fetch(`${url}/api/user/${id}`, { method: 'DELETE' });
        return fetchWrapper(fn);
    }

    const value: IContext = {
        users,
        setUsers,
        edit,
        setEdit,
        editableUser,
        setEditableUser,
        findAllUsers,
        findUserById,
        createUser,
        updateUser,
        deleteUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
