import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faThumbtack, faDiagramProject, faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';
export default function Sidebar({
    showSidebar,
    showSidebarDelay,
}: {
    showSidebar: boolean;
    showSidebarDelay: boolean;
}) {
    const [tab, setTab] = useState(0);
    return (
        <div
            data-testid="sidebar"
            className={`bg-gray-800 shadow-xl overflow-hidden flex flex-none flex-col justify-between h-full ${
                showSidebar ? 'w-64' : 'w-16'
            } absolute top-0 left-0 duration-300`}
        >
            <div className={`h-full ${showSidebarDelay ? 'hidden' : ''}`}>
                <div className="h-16 w-full flex items-center justify-center" data-testid="sidebar-icon">
                    <div className="text-3xl bg-gray-300 rounded-full h-10 w-10 grid place-items-center text-gray-700">
                        A
                    </div>
                </div>
                <ul className="mt-[50px] flex flex-col items-center">
                    <li
                        onClick={() => setTab(0)}
                        className={`hover:text-gray-500 cursor-pointer mb-[30px] ${
                            tab === 0 ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        data-testid="home-tab-hidden"
                    >
                        <Link href="/admin">
                            <a>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faHouse} />
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li
                        onClick={() => setTab(1)}
                        className={`hover:text-gray-500 cursor-pointer mb-8 ${
                            tab === 1 ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        data-testid="user-tab-hidden"
                    >
                        <Link href="/admin/Users">
                            <a>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li
                        onClick={() => setTab(2)}
                        className={`hover:text-gray-500 cursor-pointer mb-8 ${
                            tab === 2 ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        data-testid="task-tab-hidden"
                    >
                        <Link href="/admin/Tasks">
                            <a>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faThumbtack} />
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li
                        onClick={() => setTab(3)}
                        className={`hover:text-gray-500 cursor-pointer mb-8 ${
                            tab === 3 ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        data-testid="project-tab-hidden"
                    >
                        <Link href="/admin/Projects">
                            <a>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faDiagramProject} />
                                </div>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`h-full ${showSidebarDelay ? '' : 'hidden'}`}>
                <div className="h-16 w-full flex items-center pl-6">
                    <div className="text-3xl bg-gray-300 rounded-full h-10 w-10 grid place-items-center text-gray-700 flex-none">
                        A
                    </div>
                    <h1 className="text-xl font-black ml-2 whitespace-nowrap">Admin Panel</h1>
                </div>
                <ul className="mt-12 px-8">
                    <li
                        onClick={() => setTab(0)}
                        className={`hover:text-gray-500 cursor-pointer mb-6 ${
                            tab === 0 ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        data-testid="home-tab"
                    >
                        <Link href="/admin">
                            <a className='flex w-full justify-between items-center'>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faHouse} />
                                    <span className="text-sm  ml-2">Inicio</span>
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li
                        onClick={() => setTab(1)}
                        className={`hover:text-gray-500 cursor-pointer mb-6 ${
                            tab === 1 ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        data-testid="user-tab"
                    >
                        <Link href="/admin/Users">
                            <a className='flex w-full justify-between items-center'>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="text-sm  ml-2">Usuarios</span>
                                </div>
                                <div
                                    className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs"
                                    data-testid="users-counter"
                                >
                                    5
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li
                        onClick={() => setTab(2)}
                        className={`hover:text-gray-500 cursor-pointer mb-6 ${
                            tab === 2 ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        data-testid="task-tab"
                    >
                        <Link href="/admin/Tasks">
                            <a className='flex w-full justify-between items-center'>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faThumbtack} />
                                    <span className="text-sm  ml-2">Tareas</span>
                                </div>
                                <div
                                    className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs"
                                    data-testid="tasks-counter"
                                >
                                    5
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li
                        onClick={() => setTab(3)}
                        className={`hover:text-gray-500 cursor-pointer mb-6 ${
                            tab === 3 ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        data-testid="project-tab"
                    >
                        <Link href="/admin/Projects">
                            <a className='flex w-full justify-between items-center'>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faDiagramProject} />
                                    <span className="text-sm  ml-2">Proyectos</span>
                                </div>
                                <div
                                    className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs"
                                    data-testid="projects-counter"
                                >
                                    8
                                </div>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`flex justify-center mb-4 px-4 ${showSidebarDelay ? '' : 'hidden'}`}>
                <div className="relative bg-gray-800" data-testid="search-input">
                    <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="relative bottom-1 opacity-60" />
                    </div>
                    <input
                        className="bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 pl-10 py-2"
                        type="text"
                        placeholder="Buscar"
                    />
                </div>
            </div>
            <div className="px-8 border-t border-gray-700 h-10 flex-none"></div>
        </div>
    );
}
