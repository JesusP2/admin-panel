import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminLayout from 'components/AdminLayout';
import TaskTable from 'components/TaskTable';
import { useTask } from 'contexts/Task';
import { useUser } from 'contexts/User';
import { ReactElement, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Tags, Task } from 'types';
import Select from 'react-select';
import { useProject } from 'contexts/Project';

export default function Tasks() {
    const { edit, setEdit, setTasks, createTask, tasks, deleteTask, editableTask, setEditableTask } = useTask();
    const { users } = useUser();
    const { projects } = useProject();
    const { register, resetField, handleSubmit } = useForm();
    const closeModal = useRef<HTMLLabelElement | null>(null);
    const [inputSelector, setInputSelector] = useState(0);
    const [uids, setUids] = useState<string[]>([]);
    const [projectId, setProjectId] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    async function onSubmit(data: any) {
        if (0 > new Date(data.duration).getTime() - new Date().getTime()) {
            return toast.error('Fecha invalida');
        } else if (!projectId) {
            return toast.error('Debes seleccionar un proyecto');
        } else if (!uids.length) {
            return toast.error('Debes seleccionar al menos 1 usuario');
        }
        data.duration = new Date(data.duration).toISOString();
        data.projectId = projectId;
        data.tags = tags;
        data.uid = uids;
        console.log(data)
        try {
            const task = await createTask(data);
            if (tasks) {
                setTasks((prev) => [...prev!, { ...task, edit: false }]);
            }
            resetForm();
            toast.success('Tarea creada');
            if (closeModal.current) {
                closeModal.current.click();
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    }

    function resetForm() {
        resetField('name');
        resetField('description');
        resetField('duration');
        setUids([]);
        setProjectId('');
        setTags([]);
    }

    async function deleteOneTask() {
        try {
            await deleteTask(editableTask.id);
            setEdit(false);
            setTasks((prev) => prev!.filter(({ id }) => id !== editableTask.id));
            setEditableTask({} as Task);
            toast.success('Tarea eliminada');
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    }

    return (
        <>
            <div className="flex">
                <h1 className="text-black text-3xl font-black mb-4 font-mono">Tareas</h1>
                <label className="btn modal-button btn-sm btn-square btn-success ml-8" htmlFor="my-modal-4">
                    +
                </label>
                <button
                    className="btn btn-error btn-sm btn-square ml-4"
                    disabled={!edit}
                    onClick={() => deleteOneTask()}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal">
                <label className="modal-box relative w-80">
                    <h3 className="text-lg font-bold text-center">Crear tarea</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full px-4">
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="Nombre"
                            disabled={inputSelector !== 0}
                        />
                        <textarea
                            {...register('description', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="Escribe algo..."
                            disabled={inputSelector !== 0}
                        />
                        {users && (
                            <Select
                                onChange={(e) => setUids(e.map(({ value }) => value))}
                                onFocus={() => setInputSelector(1)}
                                onMenuClose={() => setInputSelector(0)}
                                isDisabled={inputSelector === 2 || inputSelector === 3}
                                isMulti={true}
                                options={users.map((user) => ({ value: user.uid, label: user.displayName }))}
                                className="my-4"
                            />
                        )}
                        {projects && (
                            <Select
                                onChange={(e) => setProjectId(e?.value || '')}
                                onFocus={() => setInputSelector(2)}
                                onMenuClose={() => setInputSelector(0)}
                                isDisabled={inputSelector === 1 || inputSelector == 3}
                                options={projects.map((project) => ({ value: project.id, label: project.name }))}
                            />
                        )}
                        <Select
                            onChange={(e) => setTags(e.map(({ value }) => value))}
                            isMulti={true}
                            onFocus={() => setInputSelector(3)}
                            onBlur={() => setInputSelector(0)}
                            isDisabled={inputSelector === 1 || inputSelector == 2}
                            options={Object.entries(Tags).map(([k, v]) => ({ value: k, label: v }))}
                            className="my-4"
                        />
                        <input
                            type="date"
                            {...register('duration', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="duración"
                        />
                        <div className="modal-action flex justify-between">
                            <button type="submit" className="btn btn-success">
                                CREAR
                            </button>
                            <label
                                htmlFor="my-modal-4"
                                className="btn btn-error"
                                ref={closeModal}
                                onClick={() => resetForm()}
                            >
                                Cancelar
                            </label>
                        </div>
                    </form>
                </label>
            </div>
            <TaskTable />
        </>
    );
}

Tasks.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
