import type { AppProps } from 'next/app';
import { AuthProvider } from 'contexts/Auth';
import { TaskProvider } from 'contexts/Task';
import { UserProvider } from 'contexts/User';
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

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <AuthProvider>
            <TaskProvider>
                <UserProvider>
                    {getLayout(<Component {...pageProps} />)}
                </UserProvider>
                <ToastContainer />
            </TaskProvider>
        </AuthProvider>
    );
}
