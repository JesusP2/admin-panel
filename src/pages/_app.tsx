import type { AppProps } from 'next/app';
import { AuthProvider } from 'contexts/Auth';
import {ToastContainer} from 'react-toastify'
import 'styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer />
        </AuthProvider>
    );
}

export default MyApp;
