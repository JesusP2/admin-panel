import AdminLayout from 'components/AdminLayout';
import ProjectTable from 'components/ProjectTable';
import { ReactElement } from 'react';

export default function Projects() {
    return (
        <>
            <h1 className="text-black text-3xl font-black mb-4 font-mono">Proyectos</h1>
            <ProjectTable />
        </>
    );
}

Projects.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
