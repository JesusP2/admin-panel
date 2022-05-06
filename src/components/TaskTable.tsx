import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'types';
import { useState } from 'react';
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
            const { name, description, duration, id } = editableTask;
            await updateTask(id, { name, description, duration });
            toast.success('Usuario actualizado');
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
        <div className="overflow-auto">
            <table className="table table-zebra table-fixed table-compact w-full">
                <thead>
                    <tr>
                        <th className="w-14"></th>
                        <th>Nombre</th>
                        <th className="max-w-64">Descripción</th>
                        <th className="w-32"># de usuarios</th>
                        <th>Proyecto</th>
                        <th>Duración</th>
                        <th>tags</th>
                        <th className="w-48">fecha de creación</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {tasks?.map(({ id, name, description, uid, project, duration, tags, createdAt, edit }, idx) => {
                        if (edit) {
                            return (
                                <tr key={id} className="hover">
                                    <td className="w-14">
                                        <button onClick={() => saveRow(idx)}>
                                            <FontAwesomeIcon icon={faCheck} className="cursor-pointer text-green-600" />
                                        </button>
                                        <button onClick={() => closeEdit(idx)} className="ml-2">
                                            <FontAwesomeIcon icon={faXmark} className="cursor-pointer text-red-600" />
                                        </button>
                                    </td>
                                    <td>
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
                                    <td>
                                        <textarea
                                            value={editableTask.description}
                                            onChange={(e) =>
                                                setEditableTask((prev) => ({ ...prev, description: e.target.value }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        ></textarea>
                                    </td>
                                    <td>
                                        <ul>
                                            {uid.map((uid) => (
                                                <li>{users?.find((user) => user.uid === uid)?.displayName}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{project.name}</td>
                                    <td>{getDurationInDays(duration, createdAt)}</td>
                                    <td>
                                        <ul>
                                            {tags.map((tag) => (
                                                <li>{tag.tag.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{createdAt.slice(0, 10)}</td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={id} className="hover">
                                <td className="w-14">
                                    <button onClick={() => editTask(idx)}>
                                        <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" />
                                    </button>
                                </td>
                                <td>{name}</td>
                                <td className="whitespace-normal">{description}</td>
                                <td>
                                    <ul>
                                        {uid.map((uid) => (
                                            <li>{users?.find((user) => user.uid === uid)?.displayName}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{project.name}</td>
                                <td>{getDurationInDays(duration, createdAt)}</td>
                                <td>
                                    <ul>
                                        {tags.map((tag) => (
                                            <li>{tag.tag.name}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{createdAt.slice(0, 10)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
