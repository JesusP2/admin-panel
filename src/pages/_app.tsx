import type { AppProps } from 'next/app';
import { AuthProvider } from 'contexts/Auth';
import { TaskProvider } from 'contexts/Task';
import { UserProvider } from 'contexts/User';
import { ProjectProvider } from 'contexts/Project';
import { ToastContainer } from 'react-toastify';
import 'styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: any) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page: any) => page);

    return (
        <AuthProvider>
            <TaskProvider>
                <UserProvider>
                    <ProjectProvider>{getLayout(<Component {...pageProps} />)}</ProjectProvider>
                </UserProvider>
                <ToastContainer />
            </TaskProvider>
        </AuthProvider>
    );
}
