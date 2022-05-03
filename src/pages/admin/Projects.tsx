import AdminLayout from "components/AdminLayout";
import { ReactElement } from 'react';

export default function Projects() {
    return (
        <div>projects</div>
    )
}

Projects.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

