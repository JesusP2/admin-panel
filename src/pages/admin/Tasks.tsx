import AdminLayout from "components/AdminLayout";
import TaskTable from "components/TaskTable";
import { ReactElement } from 'react';

export default function Tasks() {
    return (
        <>
            <h1 className="text-black text-3xl font-black mb-4 font-mono">Tareas</h1>
            <TaskTable />
        </>
    )
}

Tasks.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
