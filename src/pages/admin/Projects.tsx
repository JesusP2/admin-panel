import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminLayout from 'components/AdminLayout';
import ProjectTable from 'components/ProjectTable';
import { useProject } from 'contexts/Project';
import { useUser } from 'contexts/User';
import { ReactElement, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Project, Tags } from 'types';
import Select from 'react-select';

export default function Projects() {
    const { edit, setEdit, setProjects, createProject, projects, deleteProject, editableProject, setEditableProject } =
        useProject();
    const { users } = useUser();
    const [uids, setUids] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const { register, resetField, handleSubmit } = useForm();
    const closeModal = useRef<HTMLLabelElement | null>(null);
    const [inputSelector, setInputSelector] = useState(0);

    async function onSubmit(data: any) {
        if (0 > new Date(data.duration).getTime() - new Date().getTime()) {
            return toast.error('Fecha invalida');
        }
        data.duration = new Date(data.duration).toISOString();
        data.uid = uids;
        data.tags = tags;
        try {
            const project = await createProject(data);
            if (projects) {
                setProjects((prev) => [...prev!, { ...project, edit: false }]);
            }
            resetForm();
            toast.success('Proyecto creado');
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
        setTags([]);
    }

    async function deleteOneProject() {
        try {
            await deleteProject(editableProject.id);
            setEdit(false);
            setProjects((prev) => prev!.filter(({ id }) => id !== editableProject.id));
            setEditableProject({} as Project);
            toast.success('Proyecto eliminado');
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex px-6">
                <h1 className="text-black text-3xl font-black mb-4 font-mono">Proyectos</h1>
                <label className="btn modal-button btn-sm btn-square btn-success ml-8" htmlFor="my-modal-4">
                    +
                </label>
                <button
                    className="btn btn-error btn-sm btn-square ml-4"
                    disabled={!edit}
                    onClick={() => deleteOneProject()}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal">
                <label className="modal-box relative w-80">
                    <h3 className="text-lg font-bold text-center">Crear proyecto</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full px-4">
                        <input
                            disabled={inputSelector !== 0}
                            type="text"
                            {...register('name', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="Nombre"
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
                                isDisabled={inputSelector === 2}
                                isMulti={true}
                                options={users.map((user) => ({ value: user.uid, label: user.displayName }))}
                            />
                        )}
                        <Select
                            onChange={(e) => setTags(e.map(({ value }) => value))}
                            isMulti={true}
                            onFocus={() => setInputSelector(2)}
                            onBlur={() => setInputSelector(0)}
                            isDisabled={inputSelector === 1}
                            options={Object.entries(Tags).map(([k, v]) => ({ value: k, label: v }))}
                            className="my-8"
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
            <div className="flex-1 w-full overflow-y-auto px-6">
                <ProjectTable />
            </div>
        </div>
    );
}


Projects.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
