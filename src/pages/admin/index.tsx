import AdminLayout from 'components/AdminLayout';
import { ReactElement } from 'react';

export default function Home() {
    return <div>admin</div>;
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
