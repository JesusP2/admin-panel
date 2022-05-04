import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { User } from 'types';
import { useState } from 'react';

const usersFetched: User[] = [
    {
        id: '1',
        name: 'jesus',
        email: 'jesusprzprz.e@gmail.com',
        tasksCompleted: 3,
        totalTasks: 10,
        currentProject: '',
        edit: false,
    },
    {
        id: '2',
        name: 'JESUS',
        email: 'jesusprzprz.e@gmail.com',
        tasksCompleted: 9,
        totalTasks: 10,
        currentProject: 'Secreto',
        edit: false,
    },
];
export default function UserTable() {
    const [users, setUsers] = useState(usersFetched);

    const [editableUser, setEditableUser] = useState<User>({} as User);
    function editUser(idx: number) {
        if (editableUser.id !== users[idx].id && editableUser.edit) return;
        const user = users[idx];
        user.edit = !user.edit;
        if (user.edit) {
            setEditableUser(user);
        }
        setUsers((prev) => [...prev.slice(0, idx), user, ...prev.slice(idx + 1)]);
    }

    function saveRow(idx: number) {
        setUsers((prev) => [...prev.slice(0, idx), { ...editableUser, edit: false }, ...prev.slice(idx + 1)]);
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact table-zebra w-full table-fixed">
                <thead>
                    <tr>
                        <th className="w-14 "></th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th># tareas completadas</th>
                        <th>Tareas totales</th>
                        <th>Proyecto actual</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {users.map(({ id, name, email, tasksCompleted, totalTasks, currentProject, edit }, idx) => {
                        if (edit) {
                            return (
                                <tr key={id} className="hover">
                                    <td className="w-14">
                                        <button onClick={() => saveRow(idx)}>
                                            <FontAwesomeIcon icon={faCheck} className="cursor-pointer text-green-600" />
                                        </button>
                                        <button onClick={() => editUser(idx)} className="ml-2">
                                            <FontAwesomeIcon icon={faXmark} className="cursor-pointer text-red-600" />
                                        </button>
                                    </td>
                                    <td>
                                        <input
                                            size={15}
                                            type="text"
                                            value={editableUser.name}
                                            onChange={(e) =>
                                                setEditableUser((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            size={18}
                                            type="email"
                                            value={editableUser.email}
                                            onChange={(e) =>
                                                setEditableUser((prev) => ({ ...prev, email: e.target.value }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            size={3}
                                            type="number"
                                            min={0}
                                            value={editableUser.tasksCompleted}
                                            onChange={(e) =>
                                                setEditableUser((prev) => ({
                                                    ...prev,
                                                    tasksCompleted: parseInt(e.target.value, 10) || 0,
                                                }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            size={3}
                                            type="number"
                                            min={0}
                                            value={editableUser.totalTasks}
                                            onChange={(e) =>
                                                setEditableUser((prev) => ({
                                                    ...prev,
                                                    totalTasks: parseInt(e.target.value, 10) || 0,
                                                }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            size={18}
                                            value={editableUser.currentProject}
                                            onChange={(e) =>
                                                setEditableUser((prev) => ({ ...prev, currentProject: e.target.value }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        />
                                    </td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={id} className="hover">
                                <td className="w-14">
                                    <button onClick={() => editUser(idx)}>
                                        <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" />
                                    </button>
                                </td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{tasksCompleted}</td>
                                <td>{totalTasks}</td>
                                <td>{currentProject}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
