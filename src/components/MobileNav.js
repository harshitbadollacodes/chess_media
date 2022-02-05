import { NavLink } from "react-router-dom";
import { FaPlus, FaRegBell } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";

export function MobileNav() {

    const { userId } = useSelector(state => state.user);

    return (
        <div className="fixed bottom-0 flex flex-nowrap w-full border-2 bg-white items-center p-2 lg:hidden">
            <NavLink 
                to="/" 
                className="w-[20%] text-center"
            >   
                <div className="p-1">
                    <AiOutlineHome size={30} className="m-auto"/> 
                </div>
            </NavLink>

            <NavLink 
                to="/explore" 
                className={`
                    w-[20%]
                `}
            >
                <div className="p-1">
                    <MdOutlineExplore size={30} className="m-auto"/>
                </div>
            </NavLink>

            <NavLink 
                to="/post" 
                className={`
                    w-[20%]
                `}
            >
                <div className="p-1">
                    <FaPlus size={30} className="m-auto"/>  
                </div>
            </NavLink>

            <NavLink 
                to="/notifications"  
                className={`
                    w-[20%]
                `}
            >
                <div className="p-1">
                    <FaRegBell size={30} className="m-auto"/>
                </div>
            </NavLink>

            <NavLink 
                to={`/profile/${userId}`}
                className={`
                    w-[20%]
                `}
            >
                <div className="p-1">
                    <HiOutlineUser size={30} className="m-auto"/>
                </div>
            </NavLink>
            
        </div>
    );
}

