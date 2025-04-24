import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from '../layouts/Navbar';
import SideMenu from '../layouts/SideMenu';
import FloatingChatBot from '../../components/chatBot/FloatingChatBot.jsx';

function DashboardLayout({ children, activeMenu }) {
    const { user } = useContext(UserContext);

    return (


        <div>
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className="flex max-w-full">
                    <div className="hidden md:block">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">{children}</div>
                </div>
            )}
            {user && <FloatingChatBot />}
        </div>
    );
}

export default DashboardLayout;