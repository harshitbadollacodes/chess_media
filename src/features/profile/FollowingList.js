import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "./profileSlice";

export function FollowingList() {

    const { profileId } = useParams();

    const { userDetails: { followingList } } = useSelector(state => state.profile);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDetails(profileId));
    }, [profileId, dispatch]);
    
    return (
        <div className="py-2 mr-2 mt-2 w-full lg:w-[60%]">
            <h1 
                className="text-xl font-bold"
            >
                Following
            </h1>
            
            {
                followingList?.map(({_id, firstName, username}) => (
                    <div 
                        key={_id}
                        className="flex justify-between my-4 items-center bg-white p-2 rounded-xl"
                    >
                        
                        <Link to={`/profile/${_id}`}>
                            <p className="font-bold">{firstName}</p>
                            <p>@{username}</p>
                        </Link>

                    </div>
                ))
            }

        </div>
    );
}