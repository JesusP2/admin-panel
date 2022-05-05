import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminLayout from 'components/AdminLayout';
import TaskTable from 'components/TaskTable';
import { useTask } from 'contexts/Task';
import { useUser } from 'contexts/User';
import { ReactElement, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Task } from 'types';

export default function Tasks() {
    const { edit, setEdit, setTasks, createTask, tasks, deleteTask, editableTask, setEditableTask } =
        useTask();
    const { users } = useUser();
    const { register, resetField, handleSubmit } = useForm();
    const closeModal = useRef<HTMLLabelElement | null>(null);

    async function onSubmit(data: any) {
        try {
            data.duration = new Date(data.duration).toISOString()
            data.projectId = "ceb079fb-2798-4732-ba81-bfa69f8b4140"
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
        resetField('uid');
        resetField('projectId');
        resetField('duration');
        resetField('tags');
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
                        />
                        <textarea
                            {...register('description', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="Escribe algo..."
                        />
                        {/* TODO: Add fetched projects */}
                        <select className="select w-full max-w-xs" {...register('projectId')}>
                            <option disabled selected>
                                Proyecto
                            </option>
                            {users?.map((user) => (
                                <option key={user.uid} value={user.uid}>{user.displayName}</option>
                            ))}
                        </select>
                        <select className="select w-full max-w-xs" {...register('uid')} multiple>
                            <option disabled selected>
                                Usuarios
                            </option>
                            {users?.map((user) => (
                                <option key={ user.uid } value={user.uid}>{user.displayName}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            {...register('duration', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="duración"
                        />
                        {/* TODO: Add fetched tags  */}
                        <select className="select w-full max-w-xs" {...register('tags')} multiple>
                            <option disabled selected>
                                Tags
                            </option>
                            <option>Homer</option>
                            <option>Marge</option>
                            <option>Bart</option>
                            <option>Lisa</option>
                            <option>Maggie</option>
                        </select>
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
}
