import AdminLayout from "components/AdminLayout";
import { ReactElement } from 'react';

export default function Tasks() {
    return (
        <div></div>
    )
}

Tasks.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
