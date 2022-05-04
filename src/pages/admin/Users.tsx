import AdminLayout from "components/AdminLayout";
import UserTable from "components/UserTable";
import { ReactElement } from 'react';

export default function Users() {
    return (
        <>
            <h1 className="text-black text-3xl font-black mb-4 font-mono">Usuarios</h1>
            <UserTable />
        </>
    )
}

Users.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

