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

const UserContext = createContext({} as IContext)

export function useUser() {
    return useContext(UserContext)
}

const url = 'http://localhost:3000';
export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<null | User[]>([])
    const [edit, setEdit] = useState(false)
    const [editableUser, setEditableUser] = useState<User>({} as User);

    async function findAllUsers() {
        const res = await fetch(`${url}/api/user`);
        if (!res.ok) {
            throw new Error((await res.json()).error)
        }
        return res.json()
    }

    async function findUserById(id: string) {
        const res = await fetch(`${url}/api/user/${id}`);
        if (!res.ok) {
            throw new Error((await res.json()).error)
        }

        return res.json()
    }

    async function createUser(user: CreateUser) {
        const res = await fetch(`${url}/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            throw new Error((await res.json()).error)
        }
        return res.json()
    }

    async function updateUser(id: string, user: Partial<CreateUser>) {
        const res = await fetch(`${url}/api/user/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            throw new Error((await res.json()).error)
        }
        return res.json()
    }

    async function deleteUser(id: string) {
        const res = await fetch(`${url}/api/user/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            throw new Error((await res.json()).error)
        }
        return res.json()
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
        deleteUser
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
