import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useUser } from 'contexts/User';
import { User } from 'types';
import { toast } from 'react-toastify';

export default function UserTable() {
    const { setEdit, edit, editableUser, setEditableUser, users, setUsers, updateUser } = useUser();
    function editUser(idx: number) {
        if (!users) return;
        if (edit) return;
        const user = users[idx];
        user.edit = true;
        setEdit(true);
        setEditableUser(user);
        setUsers([...users.slice(0, idx), user, ...users.slice(idx + 1)]);
    }

    function closeEdit(idx: number) {
        if (!users) return;
        setEdit(false);
        setUsers([...users.slice(0, idx), { ...users[idx], edit: false }, ...users.slice(idx + 1)]);
        setEditableUser((prev) => ({ ...prev, edit: false }));
    }

    async function saveRow(idx: number) {
        if (!users) return;
        try {
            const { displayName, email, uid } = editableUser;
            await updateUser(uid, { displayName, email });
            toast.success('Usuario actualizado');
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
            return;
        }
        setEdit(false);
        setEditableUser((prev) => ({ ...prev, edit: false }));
        setUsers([...users.slice(0, idx), { ...editableUser, edit: false }, ...users.slice(idx + 1)]);
    }

    return (
        <table className="table table-compact table-zebra w-full table-fixed">
            <thead>
                <tr className="sticky top-0">
                    <th className="w-14"></th>
                    <th className="w-32">Nombre</th>
                    <th className="w-56">Correo</th>
                    <th className="w-16">Rol</th>
                    <th className="w-32">Tareas completadas</th>
                    <th className="w-32">Proyecto</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {users &&
                    users.map(({ uid, displayName, email, tasksCompleted, currentProject, edit }, idx) => {
                        if (edit) {
                            return (
                                <tr key={uid} className="hover">
                                    <td className="whitespace-normal break-words">
                                        <button onClick={() => saveRow(idx)}>
                                            <FontAwesomeIcon icon={faCheck} className="cursor-pointer text-green-600" />
                                        </button>
                                        <button onClick={() => closeEdit(idx)} className="ml-2">
                                            <FontAwesomeIcon icon={faXmark} className="cursor-pointer text-red-600" />
                                        </button>
                                    </td>
                                    <td className="whitespace-normal break-words">
                                        <input
                                            size={15}
                                            type="text"
                                            value={editableUser.displayName}
                                            onChange={(e) =>
                                                setEditableUser((prev) => ({
                                                    ...prev,
                                                    displayName: e.target.value,
                                                }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        />
                                    </td>
                                    <td className="whitespace-normal break-words">
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
                                    <td>{'Viewer'}</td>
                                    <td className="whitespace-normal break-words">{tasksCompleted}</td>
                                    <td className="whitespace-normal break-words">{currentProject || 'Libre'}</td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={uid} className="hover">
                                <td className="whitespace-normal break-words">
                                    <button onClick={() => editUser(idx)}>
                                        <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" />
                                    </button>
                                </td>
                                <td className="whitespace-normal break-words">{displayName}</td>
                                <td className="whitespace-normal break-words">{email}</td>
                                <td className="whitespace-normal break-words">{'Admin'}</td>
                                <td className="whitespace-normal break-words">{tasksCompleted}</td>
                                <td className="whitespace-normal break-words">{currentProject || 'Libre'}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
