import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { User, CreateUser } from 'types';
import { useAuth } from 'contexts/Auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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

const url = process.env.NEXT_PUBLIC_HOST;
export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<null | User[]>([]);
    const [edit, setEdit] = useState(false);
    const [editableUser, setEditableUser] = useState<User>({} as User);
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

    async function findAllUsers() {
        return fetchWrapper(`${url}/api/user`);
    }

    async function findUserById(id: string) {
        return fetchWrapper(`${url}/api/user/${id}`);
    }

    async function createUser(user: CreateUser) {
        return fetchWrapper(`${url}/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
    }

    async function updateUser(id: string, user: Partial<CreateUser>) {
        return fetchWrapper(`${url}/api/user/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
    }

    async function deleteUser(id: string) {
        return fetchWrapper(`${url}/api/user/${id}`, { method: 'DELETE' });
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
