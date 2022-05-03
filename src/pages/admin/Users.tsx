import AdminLayout from "components/AdminLayout";
import { ReactElement } from 'react';

export default function Users() {
    return (
        <div>users</div>
    )
}

Users.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

