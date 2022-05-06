import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Sidebar from './SidebarLayout';
import { useAuth } from 'contexts/Auth';
import { useRouter } from 'next/router';
import { useProject } from 'contexts/Project';
import { useUser } from 'contexts/User';
import { useTask } from 'contexts/Task';
import { toast } from 'react-toastify';
import type { User, Project, Task } from 'types';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSidebarDelay, setShowSidebarDelay] = useState(true);
    const { currentUser, isAdmin, logOut } = useAuth();
    const { findAllTasks, setTasks } = useTask();
    const { findAllUsers, setUsers } = useUser();
    const { findAllProjects, setProjects } = useProject();

    const router = useRouter();
    useEffect(() => {
        if (!showSidebar) {
            setTimeout(() => setShowSidebarDelay(false), 200);
        } else {
            setShowSidebarDelay(true);
        }
    }, [showSidebar]);

    useEffect(() => {
        if (!currentUser) {
            router.push('/admin/signin');
        }

        isAdmin().then((admin) => {
            if (!admin) {
                router.push('/admin/signin');
            }
        });

        const promise = [findAllTasks(), findAllUsers(), findAllProjects()];
        Promise.all(promise)
            .then((res) => {
                setTasks(res[0]?.map((task: Task) => ({ ...task, edit: false })));
                setUsers(res[1]?.users.map((user: User) => ({ ...user, edit: false })));
                setProjects(res[2]?.map((project: Project) => ({ ...project, edit: false })));
            })
            .catch((err) => toast.error(err.message));
    }, [currentUser]);

    async function logout() {
        await logOut();
        await router.push('/admin/signin');
    }

    if (!currentUser) {
        return (
            <div className="w-screen h-screen grid place-items-center">
                <h1 className="textl-3xl font-black">CARGANDO...</h1>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <Sidebar showSidebar={showSidebar} showSidebarDelay={showSidebarDelay} />
            <div className={`w-full flex flex-col flex-1 bg-zinc-200 ${showSidebar ? 'pl-64' : 'pl-16'} duration-300`}>
                <nav
                    className="w-full h-12 shadow-xl bg-gray-100 border border-b-1 border-stone-300"
                    data-testid="navbar"
                >
                    <div className="max-w-6xl h-full flex justify-between">
                        <div className="h-12 w-12 grid place-items-center">
                            <button onClick={() => setShowSidebar((prev) => !prev)}>
                                <FontAwesomeIcon icon={faBars} size="lg" className="text-gray-500" />
                            </button>
                        </div>
                        <div className="h-full w-12 grid place-items-center">
                            <div className="dropdown">
                                <label
                                    tabIndex={0}
                                    className="btn btn-sm btn-square border-0 hover:bg-slate-500 bg-slate-300"
                                >
                                    <FontAwesomeIcon icon={faUser} size="lg" className="text-black" />
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow bg-slate-100 rounded-box w-52 text-stone-800"
                                >
                                    <li>
                                        <a>{currentUser?.displayName}</a>
                                    </li>
                                    <li onClick={() => logout()}>
                                        <a>Cerrar sesión</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="w-full flex-1 overlflow-x-auto overflow-y-auto pt-10 max-w-6xl">{children}</main>
            </div>
        </div>
    );
}
