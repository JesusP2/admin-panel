import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faThumbtack, faDiagramProject, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
export default function Sidebar({
    showSidebar,
    showSidebarDelay,
}: {
    showSidebar: boolean;
    showSidebarDelay: boolean;
}) {
    return (
        <div
            className={`bg-gray-800 shadow-xl overflow-hidden flex flex-none flex-col justify-between h-full ${
                showSidebar ? 'w-64' : 'w-16'
            } relative duration-300`}
        >
            <div className={`h-full ${showSidebarDelay ? 'hidden' : ''}`}>
                <div className="h-16 w-full flex items-center justify-center">
                    <div className="text-3xl bg-gray-300 rounded-full h-10 w-10 grid place-items-center text-gray-700">
                        A
                    </div>
                </div>
                <ul className="mt-[52px] flex flex-col items-center">
                    <li className="text-gray-300 hover:text-gray-500 cursor-pointer mb-8">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </li>
                    <li className="text-gray-600 hover:text-gray-500 cursor-pointer mb-8">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faThumbtack} />
                        </div>
                    </li>
                    <li className="text-gray-600 hover:text-gray-500 cursor-pointer">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faDiagramProject} />
                        </div>
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
                    <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="text-sm  ml-2">Usuarios</span>
                        </div>
                        <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                            5
                        </div>
                    </li>
                    <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faThumbtack} />
                            <span className="text-sm  ml-2">Tareas</span>
                        </div>
                        <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                            5
                        </div>
                    </li>
                    <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faDiagramProject} />
                            <span className="text-sm  ml-2">Proyectos</span>
                        </div>
                        <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                            8
                        </div>
                    </li>
                </ul>
            </div>
            <div className={`flex justify-center mb-4 px-4 ${showSidebarDelay ? '' : 'hidden'}`}>
                <div className="relative bg-gray-800">
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
