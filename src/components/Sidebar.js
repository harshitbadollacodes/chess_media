import { NavLink, useNavigate } from "react-router-dom";
import { FaPlus, FaRegBell, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { GetPathName } from "../utils/GetPathName";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

export function Sidebar() {

    const pathName = GetPathName();
    const { userId } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        dispatch(logoutUser());
        navigate("/login");
    };

    return pathName !=="login" && 
        pathName !== "signup" && (
        <div className="hidden lg:flex flex-col py-2 mr-2 mt-2 w-[20%] sticky top-0">
            <NavLink 
                to="/" 
                className={`
                    ${({ isActive }) => (isActive && 'active')}
                    sidebarLink
                `}
            >
                <AiOutlineHome size={24} className=""/> 
                <h3 className="ml-4 text-l">Home</h3>
            </NavLink>

            <NavLink 
                to="/explore" 
                className={`
                    ${({ isActive }) => (isActive && 'active')}
                    sidebarLink
                `}
            >
                <MdOutlineExplore size={24}/>
                <h3 className="ml-4 text-l">Explore</h3>
            </NavLink>

            <NavLink 
                to="/notifications"  
                className={`
                    ${({ isActive }) => (isActive && 'active')}
                    sidebarLink
                `}
            >
                <FaRegBell size={24}/>
                <h3 className="ml-4 text-l">Notifications</h3>
            </NavLink>

            <NavLink 
                to={`/profile/${userId}`}
                className={`
                    ${({ isActive }) => (isActive && 'active')}
                    sidebarLink
                `}
            >
                <HiOutlineUser size={24}/>
                <h3 className="ml-4 text-l">Profile</h3>
            </NavLink>

            <NavLink 
                to="/post" 
                className={`
                    ${({ isActive }) => (isActive && 'active')}
                    sidebarLink
                `}
            >
                <FaPlus size={24}/>
                <h3 className="ml-4 text-l">Post</h3>
            </NavLink>

            <button 
                className=" sidebarLink"
                onClick={() => logout()}
            >
                <FaSignOutAlt size={24}/>
                <h3 className="ml-4 text-l">Logout</h3>
            </button>

        </div>
  );
};