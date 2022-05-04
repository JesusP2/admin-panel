import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'types';
import { useState } from 'react';

const projectsFetched: Project[] = [
    {
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
    {
        id: '2',
        name: 'projecto 2',
        description: 'description proyecto 2',
        users: [],
        numberOfTasks: 33,
        duration: '23 days',
        tags: ['project', 'software'],
        createdAt: 'hoy',
        edit: false,
    },
];
export default function ProjectTable() {
    const [projects, setProjects] = useState(projectsFetched);

    const [editableProject, setEditableProject] = useState<Project>({} as Project);
    function editProject(idx: number) {
        if (editableProject.id !== projects[idx].id && editableProject.edit) return;
        const project = projects[idx];
        project.edit = !project.edit;
        if (project.edit) {
            setEditableProject(project);
        }
        setProjects((prev) => [...prev.slice(0, idx), project, ...prev.slice(idx + 1)]);
    }

    function saveRow(idx: number) {
        setProjects((prev) => [...prev.slice(0, idx), { ...editableProject, edit: false }, ...prev.slice(idx + 1)]);
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
                        <th># de tareas</th>
                        <th>Duración</th>
                        <th>tags</th>
                        <th className="w-48">fecha de creación</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {projects.map(
                        ({ id, name, description, users, duration, numberOfTasks, tags, createdAt, edit }, idx) => {
                            if (edit) {
                                return (
                                    <tr key={id} className="hover">
                                        <td className="w-14">
                                            <button onClick={() => saveRow(idx)}>
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="cursor-pointer text-green-600"
                                                />
                                            </button>
                                            <button onClick={() => editProject(idx)} className="ml-2">
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className="cursor-pointer text-red-600"
                                                />
                                            </button>
                                        </td>
                                        <td>
                                            <input
                                                size={15}
                                                type="text"
                                                value={editableProject.name}
                                                onChange={(e) =>
                                                    setEditableProject((prev) => ({ ...prev, name: e.target.value }))
                                                }
                                                className="bg-inherit input h-6 rounded-none pl-0"
                                            />
                                        </td>
                                        <td>
                                            <textarea
                                                value={editableProject.description}
                                                onChange={(e) =>
                                                    setEditableProject((prev) => ({
                                                        ...prev,
                                                        description: e.target.value,
                                                    }))
                                                }
                                                className="bg-inherit input h-6 rounded-none pl-0"
                                            ></textarea>
                                        </td>
                                        <td>{users.length}</td>
                                        <td>
                                            <input
                                                size={3}
                                                type="number"
                                                value={editableProject.numberOfTasks}
                                                onChange={(e) =>
                                                    setEditableProject((prev) => ({
                                                        ...prev,
                                                        numberOfTasks: parseInt(e.target.value, 10) || 0,
                                                    }))
                                                }
                                                className="bg-inherit input h-6 rounded-none pl-0"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                size={10}
                                                value={editableProject.duration}
                                                onChange={(e) =>
                                                    setEditableProject((prev) => ({
                                                        ...prev,
                                                        duration: e.target.value,
                                                    }))
                                                }
                                                className="bg-inherit input h-6 rounded-none pl-0"
                                            />
                                        </td>
                                        <td>{tags.length}</td>
                                        <td>{createdAt}</td>
                                    </tr>
                                );
                            }
                            return (
                                <tr key={id} className="hover">
                                    <td className="w-14">
                                        <button onClick={() => editProject(idx)}>
                                            <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" />
                                        </button>
                                    </td>
                                    <td>{name}</td>
                                    <td>{description}</td>
                                    <td>{users.length}</td>
                                    <td>{numberOfTasks}</td>
                                    <td>{duration}</td>
                                    <td>{tags.length}</td>
                                    <td>{createdAt}</td>
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </div>
    );
}
