import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTask } from 'contexts/Task';
import { toast } from 'react-toastify';
import { useUser } from 'contexts/User';

export default function TaskTable() {
    const { setEdit, edit, editableTask, setEditableTask, tasks, setTasks, updateTask } = useTask();
    const { users } = useUser();
    function editTask(idx: number) {
        if (!tasks) return;
        if (edit) return;
        const task = tasks[idx];
        task.edit = true;
        setEdit(true);
        setEditableTask(task);
        setTasks([...tasks.slice(0, idx), task, ...tasks.slice(idx + 1)]);
    }

    function closeEdit(idx: number) {
        if (!tasks) return;
        setEdit(false);
        setTasks([...tasks.slice(0, idx), { ...tasks[idx], edit: false }, ...tasks.slice(idx + 1)]);
        setEditableTask((prev) => ({ ...prev, edit: false }));
    }

    async function saveRow(idx: number) {
        if (!tasks) return;
        try {
            const { name, description, duration, isFinished, id } = editableTask;
            await updateTask(id, { name, description, duration, isFinished });
            toast.success('Tarea actualizado');
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
            return;
        }
        setEdit(false);
        setEditableTask((prev) => ({ ...prev, edit: false }));
        setTasks([...tasks.slice(0, idx), { ...editableTask, edit: false }, ...tasks.slice(idx + 1)]);
    }

    function getDurationInDays(date1: string, date2: string) {
        const duration = new Date(date1).getTime() - new Date(date2).getTime();
        return Math.ceil(duration / (1000 * 60 * 60 * 24)) + ' días';
    }
    return (
        <table className="table table-compact table-zebra w-full table-fixed">
            <thead>
                <tr className="sticky top-0">
                    <th className="w-14 static"></th>
                    <th className="w-32">Nombre</th>
                    <th className="w-56">Descripción</th>
                    <th className="w-32">Usuarios</th>
                    <th className="w-32">Proyecto</th>
                    <th className="w-24">Duración</th>
                    <th className="w-24">Estado</th>
                    <th className="w-24">tags</th>
                    <th className="w-48">Inicio</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {tasks?.map(
                    ({ id, name, description, uid, project, duration, isFinished, tags, createdAt, edit }, idx) => {
                        if (edit) {
                            return (
                                <tr key={id} className="hover">
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
                                            value={editableTask.name}
                                            onChange={(e) =>
                                                setEditableTask((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        />
                                    </td>
                                    <td className="whitespace-normal break-words">
                                        <textarea
                                            value={editableTask.description}
                                            onChange={(e) =>
                                                setEditableTask((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0 w-52"
                                        ></textarea>
                                    </td>
                                    <td className="whitespace-normal break-words">
                                        <ul>
                                            {uid.map((uid) => (
                                                <li key={uid}>{users?.find((user) => user.uid === uid)?.displayName}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="whitespace-normal break-words">{project.name}</td>
                                    <td className="whitespace-normal break-words">
                                        {getDurationInDays(duration, createdAt)}
                                    </td>
                                    <td className="whitespace-normal break-words">
                                        <input
                                            checked={editableTask.isFinished}
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) =>
                                                setEditableTask((prev) => ({ ...prev, isFinished: e.target.checked }))
                                            }
                                        />
                                    </td>
                                    <td className="whitespace-normal break-words">
                                        <ul>
                                            {tags.map((tag) => (
                                                <li key={tag.tagId}>{tag.tag.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{createdAt.slice(0, 10)}</td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={id} className="hover">
                                <td className="whitespace-normal break-words">
                                    <button onClick={() => editTask(idx)}>
                                        <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" />
                                    </button>
                                </td>
                                <td className="whitespace-normal break-words">{name}</td>
                                <td className="whitespace-normal break-words">{description}</td>
                                <td className="whitespace-normal break-words">
                                    <ul>
                                        {uid.map((uid) => (
                                            <li key={uid}>{users?.find((user) => user.uid === uid)?.displayName}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="whitespace-normal break-words">{project.name}</td>
                                <td className="whitespace-normal break-words">
                                    {getDurationInDays(duration, createdAt)}
                                </td>
                                <td className="whitespace-normal break-words">
                                    {isFinished ? 'Finalizado' : 'En proceso'}
                                </td>
                                <td className="whitespace-normal break-words">
                                    <ul>
                                        {tags.map((tag) => (
                                            <li key={tag.tagId}>{tag.tag.name}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{createdAt.slice(0, 10)}</td>
                            </tr>
                        );
                    },
                )}
            </tbody>
        </table>
    );
}
