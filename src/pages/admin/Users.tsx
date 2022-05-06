import AdminLayout from 'components/AdminLayout';
import UserTable from 'components/UserTable';
import { useUser } from 'contexts/User';
import { ReactElement, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { User } from 'types';

export default function Users() {
    const { createUser, users, edit, setEdit, setUsers, deleteUser, editableUser, setEditableUser } = useUser();
    const { register, resetField, handleSubmit } = useForm();
    const closeModal = useRef<HTMLLabelElement | null>(null);

    async function onSubmit(data: any) {
        try {
            const user = await createUser(data);
            if (users) {
                setUsers((prev) => [...prev!, {...user, edit: false, totalTasks: 0, tasksCompleted: 0}]);
            }
            resetForm();
            toast.success('Usuario creado');
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
        resetField('password');
        resetField('phoneNumber');
        resetField('email');
    }
    
    async function deleteOneUser() {
        try {
            await deleteUser(editableUser.uid)
            setEdit(false)
            setUsers(prev => prev!.filter(({uid}) => uid !== editableUser.uid))
            setEditableUser({} as User)
            toast.success('Usuario eliminado');
        } catch(err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    }
    return (
        <div className="flex flex-col h-full">
            <div className="flex px-6">
                <h1 className="text-black text-3xl font-black mb-4 font-mono">Usuarios</h1>
                <label className="btn modal-button btn-sm btn-square btn-success ml-8" htmlFor="my-modal-4">
                    +
                </label>
                <button
                    className="btn btn-error btn-sm btn-square ml-4"
                    disabled={!edit}
                    onClick={() => deleteOneUser()}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal">
                <label className="modal-box relative w-80">
                    <h3 className="text-lg font-bold text-center">Crear usuario</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full px-4">
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="Nombre"
                        />
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="Correo"
                        />
                        <input
                            type="tel"
                            {...register('phoneNumber')}
                            className="input input-sm rounded-sm my-2"
                            placeholder="Tel"
                        />
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            className="input input-sm rounded-sm my-2"
                            placeholder="Contraseña"
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
                <UserTable />
            </div>
        </div>
    );
}

Users.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
