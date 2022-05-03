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
            <div className="w-full flex flex-col flex-1">
                <div className="w-full h-12 shadow-xl bg-gray-100 border border-b-1 border-stone-300">
                    <div className="h-12 w-12 grid place-items-center">
                        <button onClick={() => setShowSidebar((prev) => !prev)}>
                            <FontAwesomeIcon icon={faBars} size="lg" className="text-gray-500" />
                        </button>
                    </div>
                </div>
                <div className="mx-auto w-full py-10 px-6 bg-zinc-200 flex-1">
                    <div className="w-full h-full rounded border-dashed border-2 max-w-6xl mx-auto min-w-[20rem]">{children}</div>
                </div>
            </div>
        </div>
    );
}

