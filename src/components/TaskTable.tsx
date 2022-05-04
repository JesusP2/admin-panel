import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'types';
import { useState } from 'react';

const tasksFetched: Task[] = [
    {
        id: '1',
        name: 'Tarea 1',
        description: 'description tarea 1',
        users: [],
        project: {
            id: '1',
            name: 'projecto 1',
            description: 'description proyecto 1',
            users: [],
            numberOfTasks: 33,
            duration: '23 days',
            tags: ['project', 'software'],
            createdAt: 'hoy',
            edit: false,
        },
        duration: '23 days',
        tags: ['project', 'software'],
        createdAt: 'hoy',
        edit: false,
    },
    {
        id: '2',
        name: 'Tarea 2',
        description: 'description tarea 2',
        users: [],
        project: {
            id: '1',
            name: 'projecto 1',
            description: 'description proyecto 1',
            users: [],
            numberOfTasks: 33,
            duration: '23 days',
            tags: ['project', 'software'],
            createdAt: 'hoy',
            edit: false,
        },
        duration: '24 days',
        tags: ['project', 'software'],
        createdAt: 'hoy',
        edit: false,
    },
];
export default function TaskTable() {
    const [tasks, setTasks] = useState(tasksFetched);

    const [editableTask, setEditableTask] = useState<Task>({} as Task);
    function editTask(idx: number) {
        if (editableTask.id !== tasks[idx].id && editableTask.edit) return;
        const task = tasks[idx];
        task.edit = !task.edit;
        if (task.edit) {
            setEditableTask(task);
        }
        setTasks((prev) => [...prev.slice(0, idx), task, ...prev.slice(idx + 1)]);
    }

    function saveRow(idx: number) {
        setTasks((prev) => [...prev.slice(0, idx), { ...editableTask, edit: false }, ...prev.slice(idx + 1)]);
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact table-zebra w-full table-fixed">
                <thead>
                    <tr>
                        <th className="w-14"></th>
                        <th>Nombre</th>
                        <th className="w-64">Descripción</th>
                        <th className="w-32"># de usuarios</th>
                        <th>Proyecto</th>
                        <th>Duración</th>
                        <th>tags</th>
                        <th className="w-48">fecha de creación</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {tasks.map(({id, name, description, users, project, duration, tags, createdAt, edit}, idx) => {
                        if (edit) {
                            return (
                                <tr key={id} className="hover">
                                    <td className="w-14">
                                        <button onClick={() => saveRow(idx)}>
                                            <FontAwesomeIcon icon={faCheck} className="cursor-pointer text-green-600" />
                                        </button>
                                        <button onClick={() => editTask(idx)} className="ml-2">
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
                                        >
                                </textarea>
                                    </td>
                                    <td>
                                        {users.length}
                                    </td>
                                    <td>
                                        {project.name}
                                    </td>
                                    <td>
                                        <input
                                            size={18}
                                            value={editableTask.duration}
                                            onChange={(e) =>
                                                setEditableTask((prev) => ({ ...prev, duration: e.target.value }))
                                            }
                                            className="bg-inherit input h-6 rounded-none pl-0"
                                        />
                                    </td>
                                    <td>
                                        {tags.length}
                                    </td>
                                    <td>
                                        {createdAt}
                                    </td>
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
                                <td>{description}</td>
                                <td>{users.length}</td>
                                <td>{project.name}</td>
                                <td>{duration}</td>
                                <td>{tags.length}</td>
                                <td>{createdAt}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
