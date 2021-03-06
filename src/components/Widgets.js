import { GetPathName } from "../utils/GetPathName";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../features/user/userSlice";

export function Widgets() {

    const pathName = GetPathName();

    const [searchInput, setSearchInput] = useState("");

    const { allUsers, status } = useSelector(state => state.user);

    const userList = allUsers?.filter(user => user.firstName.toLowerCase().includes(searchInput.toLowerCase()));

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(getAllUsers());
        }
    }, [dispatch, status]);

    const renderAllUsers = userList?.map(user => (
            <li 
                key={user._id} 
                className="p-2 bg-white border-2 rounded-xl flex justify-between m-2 items-center hover:bg-d-blue hover:text-white"
            >
                <Link 
                    to={`profile/${user._id}`}
                    className="w-full font-bold capitalize"
                >
                    {user.firstName}
                </Link>
            </li>
    ));


    return (
        pathName !== "login" && 
        pathName !== "signup" && 
        (
            <div className="py-2 mr-2 mt-2 hidden lg:flex">
                <div>
                    <h1 className="font-bold text-2xl">Search Users</h1>
                    <input 
                        type="text"  
                        value={searchInput}
                        placeholder="Search Users" 
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="border-2 w-full p-2 rounded-xl mt-2 outline-none"
                    />
                    <ul>
                        {renderAllUsers?.length === 0 && <p>No Users Found</p>}
                        {renderAllUsers}
                    </ul>
                </div>
            </div>
        )
    )
}