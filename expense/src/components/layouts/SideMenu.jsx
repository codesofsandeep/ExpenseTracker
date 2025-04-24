import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/Data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvtar from '../../components/cards/CharAvtar';

function SideMenu({ activeMenu }) {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === '/logout') {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[60px] z-20'>
            <div className='flex flex-col items-center justify-center gap-3 mt-3'>
                {user?.profileImageURL ? (
                    <img
                        src={user.profileImageURL}
                        alt="Profile"
                        className='w-20 h-20 mx-auto mb-2 object-cover bg-slate-400 rounded'
                    />
                ) : (
                    <CharAvtar
                        fullName={user?.fullName}
                        width='w-20'
                        height='h-20'
                        style='text-xl'
                    />
                )}

                <h5 className='text-gray-950 font-bold '>
                    {user?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button

                    key={`menu_${index}`}

                    className={`w-full flex items-center gap-4 mt-5 text-[15px] ${activeMenu === item.label ? "text-white bg-blue-600" : "text-gray-700"
                        } py-3 px-6 rounded-lg mb-3 hover:bg-blue-500 hover:text-white transition`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default SideMenu;
