import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from 'contexts/Auth';

export default function Signin() {
    const router = useRouter();
    const [user, setUser] = useState('jesusprzprz.e@gmail.com');
    const [password, setPassword] = useState('contra12345');
    const { signIn } = useAuth();

    async function login() {
        try {
            await signIn(user, password);
            // toast.success("Has iniciado de sesión")
            await router.push('/admin');
        } catch (err: unknown) {
            toast.error('Usuario o contraseña incorrectos');
        }
    }

    return (
        <div className="w-full h-screen grid place-items-center">
            <div className="card w-96 shadow-xl p-4 bg-white">
                <div className="bg-blue-700 w-full h-16 rounded-lg grid place-items-center">
                    <h1 className="text-3xl font-semibold text-white">ADMIN</h1>
                </div>
                <div className="my-8 mt-12">
                    <input
                        onChange={(e) => setUser(e.target.value)}
                        type="text"
                        className="input text-black w-full my-1 bg-inherit input-primary"
                        placeholder="usuario"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="input text-black w-full my-1 bg-inherit input-primary text-sm"
                        placeholder="contraseña"
                    />
                </div>
                <button onClick={() => login()} className="btn">
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}
