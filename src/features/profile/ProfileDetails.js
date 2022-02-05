import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserPosts } from "../../components/UserPosts";
import { getPosts } from "../post/postSlice";
import { logoutUser } from "../user/userSlice";
import { followUser, getUserDetails } from "./profileSlice";

export function ProfileDetails() {
    
    const { profileId } = useParams();
    
    const { userId, token } = useSelector(state => state.user);
    const { userDetails, followingUsers, error } = useSelector(state => state.profile);

    console.log(followingUsers);
    console.log("userdetails", userDetails);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function editHandler() {
        navigate("/editBio");
    };
    
    let getFollowerId = userDetails.followersList?.find(user => {
        console.log("27", user);
        return user._id === userId;
    });
    
    let isUserFollowing = getFollowerId === userId;
    console.log(isUserFollowing);


    function followHandler(profileId, token) {
        dispatch(followUser({profileId, token}));
    };

    function logout() {
        dispatch(logoutUser());
        navigate("/login");
    }

    useEffect(() => {
        dispatch(getUserDetails(profileId));
        dispatch(getPosts({token, profileId}));
    }, [profileId, dispatch, token]);

    return (
        <div>
            {error && <h1 className="text-red-500 text-2xl font-bold">{error}</h1>}
            <div className="flex justify-between w-full items-center border-2 bg-white rounded-xl mt-2">
                
                <div className="flex mt-8 w-full m-2">
                    <div className="flex w-full flex-col mx-4">
                        
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xl font-bold capitalize">{userDetails.firstName}</h1>
                                <h3 className="text-gray-400 text-l">@{userDetails.username}</h3>
                            </div>
                            {   profileId === userId &&
                                <button 
                                    className="btn"
                                    onClick={() => logout()}
                                >
                                    Logout
                                </button>
                            }
                        </div>

                        <div className="my-2">
                            <p className="w-full">{userDetails.bio}</p>
                        </div>
                        
                        <div className="my-2 w-[60%] flex items-center">
                            { profileId === userId  
                                && <button 
                                    className="mr-2 btn"
                                    onClick={() => editHandler()}
                                    disabled={token ? false : true}
                                >
                                    Edit Bio
                                </button> 
                            }

                            { profileId !== userId 
                                && <button 
                                    className={`mr-2 btn ${isUserFollowing && "bg-d-blue"}`}
                                    onClick={() => followHandler(profileId, token)}
                                    disabled={token ? false : true}
                                >
                                    { isUserFollowing ? "Unfollow" : "Follow" }
                                </button>   
                            }

                            <Link
                                to={`/following/${profileId}`}
                                className="mr-2 text-xl border-l-blue text-center w-full border-2 p-1.5 rounded-lg hover:bg-d-blue hover:text-white"
                            >
                                Following
                            </Link>

                            <Link
                                to={`/followers/${userId}`} 
                                className="text-xl border-l-blue text-center w-full border-2 p-1.5 rounded-lg hover:bg-d-blue hover:text-white"
                            >
                                Followers
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            
            <h1 className="text-2xl font-bold my-4">Your Posts</h1>
            <UserPosts/>

        </div>
    )
};