import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useProject } from 'contexts/Project';
import { toast } from 'react-toastify';
import { useUser } from 'contexts/User';
import { useTask } from 'contexts/Task';

export default function ProjectTable() {
    const { setEdit, edit, editableProject, setEditableProject, projects, setProjects, updateProject } = useProject();
    const { users } = useUser();
    const { tasks } = useTask();
    function editProject(idx: number) {
        if (!projects) return;
        if (edit) return;
        const project = projects[idx];
        project.edit = true;
        setEdit(true);
        setEditableProject(project);
        setProjects([...projects.slice(0, idx), project, ...projects.slice(idx + 1)]);
    }

    function closeEdit(idx: number) {
        if (!projects) return;
        setEdit(false);
        setProjects([...projects.slice(0, idx), { ...projects[idx], edit: false }, ...projects.slice(idx + 1)]);
        setEditableProject((prev) => ({ ...prev, edit: false }));
    }

    async function saveRow(idx: number) {
        if (!projects) return;
        try {
            const { name, description, duration, isFinished, id } = editableProject;
            await updateProject(id, { name, description, duration, isFinished });
            toast.success('Proyecto actualizado');
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
            return;
        }
        setEdit(false);
        setEditableProject((prev) => ({ ...prev, edit: false }));
        setProjects([...projects.slice(0, idx), { ...editableProject, edit: false }, ...projects.slice(idx + 1)]);
    }

    function getDurationInDays(date1: string, date2: string) {
        const duration = new Date(date1).getTime() - new Date(date2).getTime();
        return Math.ceil(duration / (1000 * 60 * 60 * 24)) + ' días';
    }
    return (
        <table className="table table-compact table-zebra w-full table-fixed">
            <thead>
                <tr className="sticky top-0">
                    <th className="w-14 static">hi</th>
                    <th className="w-32">Nombre</th>
                    <th className="w-56">Descripción</th>
                    <th className="w-32">Usuarios</th>
                    <th className="w-16">tareas</th>
                    <th className="w-24">Duración</th>
                    <th className="w-24">Estado</th>
                    <th className="w-24">tags</th>
                    <th className="w-48">Inicio</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {projects?.map(({ id, name, description, uid, duration, isFinished, tags, createdAt, edit }, idx) => {
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
                                        size={9}
                                        type="text"
                                        value={editableProject.name}
                                        onChange={(e) =>
                                            setEditableProject((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        className="bg-inherit input h-6 rounded-none pl-0"
                                    />
                                </td>
                                <td className="whitespace-normal break-words">
                                    <textarea
                                        value={editableProject.description}
                                        onChange={(e) =>
                                            setEditableProject((prev) => ({
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
                                <td className="whitespace-normal break-words">{tasks?.filter(({ projectId }) => projectId === id).length || '0'}</td>
                                <td className="whitespace-normal break-words">{getDurationInDays(duration, createdAt)}</td>
                                <td className="lg:px-8 sm:px-6 whitespace-normal break-words">
                                    <input
                                        checked={editableProject.isFinished}
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={(e) =>
                                            setEditableProject((prev) => ({ ...prev, isFinished: e.target.checked }))
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
                                <button onClick={() => editProject(idx)}>
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
                            <td className="whitespace-normal break-words">{tasks?.filter(({ projectId }) => projectId === id).length || '0'}</td>
                            <td className="whitespace-normal break-words">{getDurationInDays(duration, createdAt)}</td>
                            <td className="whitespace-normal break-words">{isFinished ? 'Finalizado' : 'En proceso'}</td>
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
                })}
            </tbody>
        </table>
    );
}
