import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Sidebar from './SidebarLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSidebarDelay, setShowSidebarDelay] = useState(true);
    useEffect(() => {
        if (!showSidebar) {
            setTimeout(() => setShowSidebarDelay(false), 200);
        } else {
            setShowSidebarDelay(true)
        }

    }, [showSidebar]);
    return (
        <div className="flex h-screen">
            <Sidebar showSidebar={showSidebar} showSidebarDelay={showSidebarDelay} />
            <div className={`w-full flex flex-col flex-1 bg-zinc-200 ${showSidebar ? 'pl-64' : 'pl-16'} duration-300`}>
                <nav className="w-full h-12 shadow-xl bg-gray-100 border border-b-1 border-stone-300" data-testid="navbar">
                    <div className="h-12 w-12 grid place-items-center">
                        <button onClick={() => setShowSidebar((prev) => !prev)}>
                            <FontAwesomeIcon icon={faBars} size="lg" className="text-gray-500" />
                        </button>
                    </div>
                </nav>
                <main className="w-full flex-1 overlflow-x-auto overflow-y-auto pt-10 max-w-6xl">{children}</main>
                {/* <div className="mx-auto w-full py-10 px-6 bg-zinc-200 flex-1 bg-blue-700"> */}
                {/*     <main className="h-full w-full max-w-6xl bg-blue-700">{children}</main> */}
                {/* </div> */}
            </div>
        </div>
    );
}

