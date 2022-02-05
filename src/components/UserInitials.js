import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



export function UserInitials() {
    const { userId, firstName, lastName } = useSelector(state => state.user);

    return (
        <div 
            className="flex items-center justify-center border-2 hover:border-l-blue transition-colors duration-300 rounded-full p-4 h-14 w-14"
        >
            <Link 
                to={`/profile/${userId}`} 
                className="font-bold text-xl"
            >
                {firstName.split("")[0].toUpperCase()}
                {lastName.split("")[0].toUpperCase()}
            </Link>
        </div>
    );
}
